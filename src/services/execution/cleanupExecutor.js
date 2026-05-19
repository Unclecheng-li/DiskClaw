import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { appPaths } from "../../config/defaults.js";
import { ensureDirectory, pathExists, readJsonFile, writeJsonFile } from "../../utils/fs.js";

function safeFileToken(filePath) {
  return crypto.createHash("sha1").update(filePath).digest("hex");
}

async function moveFile(sourcePath, destinationPath) {
  try {
    await fs.rename(sourcePath, destinationPath);
  } catch (error) {
    if (error.code !== "EXDEV") {
      throw error;
    }

    await fs.copyFile(sourcePath, destinationPath);
    await fs.unlink(sourcePath);
  }
}

function runPowerShell(command) {
  return new Promise((resolve, reject) => {
    const child = spawn("powershell", ["-NoProfile", "-Command", command], {
      shell: true,
      stdio: "ignore"
    });
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`PowerShell command failed with exit code ${code}.`));
      }
    });
    child.on("error", reject);
  });
}

async function moveToRecycleBin(filePath) {
  const escaped = filePath.replace(/'/g, "''");
  const command = [
    "Add-Type -AssemblyName Microsoft.VisualBasic;",
    `[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile('${escaped}', 'OnlyErrorDialogs', 'SendToRecycleBin')`
  ].join(" ");
  await runPowerShell(command);
}

async function respectController(controller) {
  if (!controller) {
    return;
  }

  if (controller.cancelled) {
    const error = new Error("Task cancelled.");
    error.code = "task_cancelled";
    throw error;
  }

  while (controller.paused) {
    await new Promise((resolve) => setTimeout(resolve, 150));
    if (controller.cancelled) {
      const error = new Error("Task cancelled.");
      error.code = "task_cancelled";
      throw error;
    }
  }
}

function countReleasedBytes(results = []) {
  return results.reduce((sum, item) => {
    if (["moved", "archived", "deleted", "recycled", "planned", "purged"].includes(item.status)) {
      return sum + Number(item.sizeBytes || 0);
    }
    return sum;
  }, 0);
}

function countCompletedItems(results = []) {
  return results.filter((item) => ["moved", "archived", "deleted", "recycled", "planned", "purged"].includes(item.status)).length;
}

export class CleanupExecutor {
  constructor() {
    this.manifestFile = path.join(appPaths.quarantineDir, "manifest.json");
  }

  summarizeStatuses(results) {
    return results.reduce((accumulator, item) => {
      const key = item.status || "unknown";
      accumulator[key] = (accumulator[key] || 0) + 1;
      return accumulator;
    }, {});
  }

  async listQuarantineItems() {
    await ensureDirectory(appPaths.quarantineDir);
    const manifest = await readJsonFile(this.manifestFile, []);
    const items = [];

    for (let index = 0; index < manifest.length; index += 1) {
      const item = manifest[index];
      let sizeBytes = 0;

      try {
        const stats = await fs.stat(item.quarantinePath);
        sizeBytes = Number(stats.size || 0);
      } catch {}

      items.push({
        id: item.id || `${index + 1}`,
        originalPath: item.originalPath,
        quarantinePath: item.quarantinePath,
        createdAt: item.createdAt,
        restoredAt: item.restoredAt || null,
        sizeBytes
      });
    }

    return items;
  }

  async execute(items, options = {}) {
    const {
      dryRun = true,
      mode = "quarantine",
      confirmHighRisk = false,
      archiveDir = "",
      controller = null,
      onProgress = null
    } = options;

    await ensureDirectory(appPaths.quarantineDir);
    if (mode === "archive") {
      await ensureDirectory(archiveDir || appPaths.archiveDir);
    }
    const manifest = await readJsonFile(this.manifestFile, []);
    const results = [];
    const totalItems = items.length;

    for (const item of items) {
      await respectController(controller);

      if (item?.risk?.level === "high" && !confirmHighRisk) {
        results.push({
          path: item.path,
          status: "skipped",
          reason: "High-risk item requires explicit confirmation."
        });
        continue;
      }

      if (!(await pathExists(item.path))) {
        results.push({
          path: item.path,
          status: "missing",
          reason: "File does not exist."
        });
        continue;
      }

      if (dryRun) {
        results.push({
          path: item.path,
          status: "planned",
          mode,
          sizeBytes: item.sizeBytes || 0
        });
        continue;
      }

      const token = safeFileToken(item.path);
      const quarantinePath = path.join(appPaths.quarantineDir, `${token}-${path.basename(item.path)}`);
      const archivePath = path.join(archiveDir || appPaths.archiveDir, `${token}-${path.basename(item.path)}`);

      try {
        if (mode === "quarantine") {
          await moveFile(item.path, quarantinePath);
          manifest.push({
            id: safeFileToken(`${item.path}:${Date.now()}`),
            originalPath: item.path,
            quarantinePath,
            createdAt: new Date().toISOString()
          });
          results.push({
            path: item.path,
            status: "moved",
            destinationPath: quarantinePath,
            sizeBytes: item.sizeBytes || 0
          });
        } else if (mode === "archive") {
          await moveFile(item.path, archivePath);
          results.push({
            path: item.path,
            status: "archived",
            destinationPath: archivePath,
            sizeBytes: item.sizeBytes || 0
          });
        } else if (mode === "permanent") {
          await fs.unlink(item.path);
          results.push({
            path: item.path,
            status: "deleted",
            sizeBytes: item.sizeBytes || 0
          });
        } else if (mode === "recycle-bin") {
          await moveToRecycleBin(item.path);
          results.push({
            path: item.path,
            status: "recycled",
            sizeBytes: item.sizeBytes || 0
          });
        } else {
          results.push({
            path: item.path,
            status: "skipped",
            reason: `Unsupported cleanup mode: ${mode}.`,
            sizeBytes: item.sizeBytes || 0
          });
        }
      } catch (error) {
        results.push({
          path: item.path,
          status: "error",
          reason: error.message,
          sizeBytes: item.sizeBytes || 0
        });
      }

      if (typeof onProgress === "function") {
        const progress = totalItems === 0
          ? 90
          : Math.min(95, Math.round(24 + (results.length / totalItems) * 64));
        onProgress({
          progress,
          completedItems: countCompletedItems(results),
          totalItems,
          releasedBytes: countReleasedBytes(results),
          currentPath: item.path
        });
      }
    }

    await writeJsonFile(this.manifestFile, manifest);

    return {
      executedAt: new Date().toISOString(),
      dryRun,
      mode,
      archiveDir: mode === "archive" ? (archiveDir || appPaths.archiveDir) : null,
      results,
      statusCounts: this.summarizeStatuses(results)
    };
  }

  async executeDuplicateResolution(groups = [], options = {}) {
    const groupResults = [];
    const statusCounts = {};

    for (const group of groups) {
      const cleanupItems = (group.cleanupCandidates || []).map((item) => ({
        path: item.path,
        risk: item.risk || {
          level: "medium",
          recommendedAction: item.recommendedAction || "quarantine"
        }
      }));

      const execution = await this.execute(cleanupItems, options);
      groupResults.push({
        key: group.key,
        representativeName: group.representativeName,
        keep: group.keep || null,
        wastedBytes: group.wastedBytes || 0,
        statusCounts: execution.statusCounts,
        cleanupResults: execution.results
      });

      for (const [status, count] of Object.entries(execution.statusCounts)) {
        statusCounts[status] = (statusCounts[status] || 0) + count;
      }
    }

    return {
      executedAt: new Date().toISOString(),
      dryRun: options.dryRun ?? true,
      mode: options.mode || "quarantine",
      groupCount: groups.length,
      groupResults,
      statusCounts
    };
  }

  async executeDirectoryHotspots(groups = [], options = {}) {
    const hotspotResults = [];
    const statusCounts = {};

    for (const hotspot of groups) {
      const cleanupItems = (hotspot.cleanupCandidates || []).map((item) => ({
        path: item.path,
        risk: item.risk || {
          level: "medium",
          recommendedAction: item.recommendedAction || "quarantine"
        }
      }));

      const execution = await this.execute(cleanupItems, options);
      hotspotResults.push({
        path: hotspot.path,
        totalBytes: hotspot.totalBytes || 0,
        candidateCount: hotspot.candidateCount || cleanupItems.length,
        statusCounts: execution.statusCounts,
        cleanupResults: execution.results
      });

      for (const [status, count] of Object.entries(execution.statusCounts)) {
        statusCounts[status] = (statusCounts[status] || 0) + count;
      }
    }

    return {
      executedAt: new Date().toISOString(),
      dryRun: options.dryRun ?? true,
      mode: options.mode || "quarantine",
      hotspotCount: groups.length,
      hotspotResults,
      statusCounts
    };
  }

  async restore(items = []) {
    await ensureDirectory(appPaths.quarantineDir);
    const manifest = await readJsonFile(this.manifestFile, []);
    const results = [];

    for (const request of items) {
      const match = manifest.find((entry) => entry.id === request.id || entry.quarantinePath === request.quarantinePath);

      if (!match) {
        results.push({
          id: request.id || null,
          status: "missing",
          reason: "Quarantine entry was not found."
        });
        continue;
      }

      if (match.restoredAt) {
        results.push({
          id: match.id,
          status: "skipped",
          reason: "Quarantine entry has already been restored."
        });
        continue;
      }

      if (!(await pathExists(match.quarantinePath))) {
        results.push({
          id: match.id,
          status: "missing",
          reason: "Quarantine file no longer exists."
        });
        continue;
      }

      try {
        await ensureDirectory(path.dirname(match.originalPath));
        await moveFile(match.quarantinePath, match.originalPath);
        match.restoredAt = new Date().toISOString();
        results.push({
          id: match.id,
          status: "restored",
          originalPath: match.originalPath
        });
      } catch (error) {
        results.push({
          id: match.id,
          status: "error",
          reason: error.message
        });
      }
    }

    await writeJsonFile(this.manifestFile, manifest);

    return {
      restoredAt: new Date().toISOString(),
      results
    };
  }

  async deleteQuarantineItems(items = []) {
    await ensureDirectory(appPaths.quarantineDir);
    const manifest = await readJsonFile(this.manifestFile, []);
    const results = [];

    for (const request of items) {
      const match = manifest.find((entry) => entry.id === request.id || entry.quarantinePath === request.quarantinePath);

      if (!match) {
        results.push({
          id: request.id || null,
          status: "missing",
          reason: "Quarantine entry was not found."
        });
        continue;
      }

      let sizeBytes = 0;

      try {
        const stats = await fs.stat(match.quarantinePath);
        sizeBytes = Number(stats.size || 0);
      } catch {}

      try {
        if (await pathExists(match.quarantinePath)) {
          await fs.unlink(match.quarantinePath);
        }
        const index = manifest.findIndex((entry) => entry.id === match.id);
        if (index >= 0) {
          manifest.splice(index, 1);
        }
        results.push({
          id: match.id,
          status: "purged",
          quarantinePath: match.quarantinePath,
          sizeBytes
        });
      } catch (error) {
        results.push({
          id: match.id,
          status: "error",
          reason: error.message,
          sizeBytes
        });
      }
    }

    await writeJsonFile(this.manifestFile, manifest);

    return {
      deletedAt: new Date().toISOString(),
      results,
      statusCounts: this.summarizeStatuses(results)
    };
  }

  async clearQuarantine() {
    const items = await this.listQuarantineItems();
    const activeItems = items
      .filter((item) => !item.restoredAt)
      .map((item) => ({
        id: item.id
      }));

    const result = await this.deleteQuarantineItems(activeItems);

    return {
      ...result,
      clearedCount: activeItems.length
    };
  }

  async purgeExpiredQuarantineItems(retentionDays = 30) {
    const days = Number(retentionDays || 30);
    if (!Number.isFinite(days) || days <= 0 || days >= 9999) {
      return {
        purgedCount: 0,
        results: [],
        statusCounts: {}
      };
    }

    const items = await this.listQuarantineItems();
    const threshold = Date.now() - days * 24 * 60 * 60 * 1000;
    const expired = items.filter((item) => !item.restoredAt && Date.parse(item.createdAt || 0) <= threshold);

    if (expired.length === 0) {
      return {
        purgedCount: 0,
        results: [],
        statusCounts: {}
      };
    }

    const result = await this.deleteQuarantineItems(expired.map((item) => ({ id: item.id })));

    return {
      purgedCount: expired.length,
      ...result
    };
  }
}
