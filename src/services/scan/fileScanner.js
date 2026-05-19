import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { defaultScanOptions } from "../../config/defaults.js";

function normalizePath(targetPath) {
  return path.resolve(targetPath);
}

function normalizeRulePaths(paths = []) {
  return paths.map((item) => path.resolve(item).toLowerCase());
}

function matchesAnyPath(targetPath, normalizedPaths = []) {
  const next = path.resolve(targetPath).toLowerCase();
  return normalizedPaths.some((rulePath) => next === rulePath || next.startsWith(rulePath + path.sep.toLowerCase()));
}

function isHiddenName(fileName) {
  return fileName.startsWith(".");
}

function bytesToMegabytes(value) {
  return Number((value / (1024 * 1024)).toFixed(2));
}

function fileFingerprint(filePath, stats) {
  const seed = `${path.basename(filePath).toLowerCase()}:${stats.size}`;
  return crypto.createHash("sha1").update(seed).digest("hex");
}

function duplicateFingerprint(filePath, stats) {
  const seed = `${path.basename(filePath).toLowerCase()}:${stats.size}:${path.extname(filePath).toLowerCase()}`;
  return crypto.createHash("sha1").update(seed).digest("hex");
}

function buildDirectorySegments(filePath, depth) {
  const directoryPath = path.dirname(filePath);
  const parsed = path.parse(directoryPath);
  const remainder = directoryPath.slice(parsed.root.length);
  const parts = remainder.split(path.sep).filter(Boolean);
  return path.join(parsed.root, ...parts.slice(0, depth));
}

function classifyFile(filePath, stats, options) {
  const normalized = filePath.toLowerCase();
  const extension = path.extname(filePath).toLowerCase();
  const now = Date.now();
  const staleMs = options.staleDays * 24 * 60 * 60 * 1000;
  const categories = [];
  const reasons = [];

  if (normalized.includes("\\temp\\") || normalized.includes("\\tmp\\") || normalized.includes("/temp/") || normalized.includes("/tmp/")) {
    categories.push("temp");
    reasons.push("Path indicates a temporary directory.");
  }

  if (normalized.includes("\\cache\\") || normalized.includes("/cache/") || normalized.includes("caches")) {
    categories.push("cache");
    reasons.push("Path indicates application or system cache.");
  }

  if (normalized.includes("$recycle.bin") || normalized.includes("recycle")) {
    categories.push("recycle-bin");
    reasons.push("Path indicates recycle bin data.");
  }

  if ([".log", ".dmp", ".trace"].includes(extension)) {
    categories.push("log");
    reasons.push("File extension indicates diagnostic or log data.");
  }

  if ([".zip", ".rar", ".7z", ".msi", ".iso"].includes(extension)) {
    categories.push("installer");
    reasons.push("File extension indicates an installer or archive.");
  }

  if (stats.size >= options.largeFileThresholdBytes) {
    categories.push("large-file");
    reasons.push(`File exceeds the large file threshold of ${bytesToMegabytes(options.largeFileThresholdBytes)} MB.`);
  }

  if (now - stats.atimeMs >= staleMs) {
    categories.push("stale");
    reasons.push(`File has not been accessed in at least ${options.staleDays} days.`);
  }

  if (matchesAnyPath(filePath, options.blacklistPathsNormalized || [])) {
    categories.push("user-blacklist");
    reasons.push("Path matches a user blacklist rule.");
  }

  return {
    categories: [...new Set(categories)],
    reasons
  };
}

async function respectController(options) {
  const controller = options.controller;

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

async function walkDirectory(directoryPath, depth, state, options) {
  if (state.files.length >= options.maxFiles || depth > options.maxDepth) {
    return;
  }

  await respectController(options);

  if (matchesAnyPath(directoryPath, options.excludePathsNormalized || [])) {
    state.warnings.push({
      path: directoryPath,
      message: "Directory skipped by exclude rule."
    });
    return;
  }

  state.currentPath = directoryPath;
  state.directoriesVisited += 1;

  emitProgress(state, options, {
    force: true,
    phase: "scan",
    message: "Scanning directory."
  });

  let entries;

  try {
    entries = await fs.readdir(directoryPath, { withFileTypes: true });
  } catch (error) {
    state.warnings.push({
      path: directoryPath,
      message: error.message
    });
    return;
  }

  for (const entry of entries) {
    await respectController(options);

    if (state.files.length >= options.maxFiles) {
      return;
    }

    if (!options.includeHidden && isHiddenName(entry.name)) {
      continue;
    }

    const entryPath = path.join(directoryPath, entry.name);

    if (matchesAnyPath(entryPath, options.excludePathsNormalized || [])) {
      continue;
    }

    if (entry.isSymbolicLink() && !options.followSymlinks) {
      continue;
    }

    if (entry.isDirectory()) {
      await walkDirectory(entryPath, depth + 1, state, options);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    try {
      const stats = await fs.stat(entryPath);
      const classification = classifyFile(entryPath, stats, options);
      const duplicateKey = stats.size >= options.duplicateMinSizeBytes
        ? duplicateFingerprint(entryPath, stats)
        : null;
      if (classification.categories.length > 0) {
        state.candidateFiles += 1;
        state.candidateBytes += stats.size;
      }
      state.files.push({
        id: fileFingerprint(entryPath, stats),
        path: entryPath,
        name: entry.name,
        extension: path.extname(entry.name).toLowerCase(),
        directory: path.dirname(entryPath),
        sizeBytes: stats.size,
        modifiedAt: new Date(stats.mtimeMs).toISOString(),
        accessedAt: new Date(stats.atimeMs).toISOString(),
        categories: classification.categories,
        reasons: classification.reasons,
        duplicateKey,
        policy: {
          whitelisted: matchesAnyPath(entryPath, options.whitelistPathsNormalized || []),
          blacklisted: matchesAnyPath(entryPath, options.blacklistPathsNormalized || [])
        }
      });
      state.totalBytes += stats.size;
      emitProgress(state, options, {
        phase: "scan",
        message: "Scanning files."
      });
    } catch (error) {
      state.warnings.push({
        path: entryPath,
        message: error.message
      });
    }
  }
}

function estimateScanProgress(state, options) {
  const maxFiles = Math.max(1, options.maxFiles || 1);
  const fileRatio = Math.min(0.82, state.files.length / maxFiles);
  return Math.max(5, Math.round(8 + fileRatio * 72));
}

function emitProgress(state, options, {
  force = false,
  phase = "scan",
  message = "Scanning."
} = {}) {
  if (typeof options.onProgress !== "function") {
    return;
  }

  const now = Date.now();

  if (!force && now - state.lastProgressAt < 120) {
    return;
  }

  state.lastProgressAt = now;
  options.onProgress({
    phase,
    progress: estimateScanProgress(state, options),
    message,
    currentPath: state.currentPath || null,
    scannedFiles: state.files.length,
    candidateFiles: state.candidateFiles,
    candidateBytes: state.candidateBytes,
    directoriesVisited: state.directoriesVisited
  });
}

export class FileScanner {
  async scan(targets = [], options = {}, runtime = {}) {
    const mergedOptions = {
      ...defaultScanOptions,
      ...options,
      onProgress: runtime.onProgress,
      controller: runtime.controller,
      excludePathsNormalized: normalizeRulePaths(runtime.rules?.excludePaths || []),
      whitelistPathsNormalized: normalizeRulePaths(runtime.rules?.whitelistPaths || []),
      blacklistPathsNormalized: normalizeRulePaths(runtime.rules?.blacklistPaths || [])
    };

    const normalizedTargets = targets.length === 0
      ? []
      : targets.map((target) => ({
          path: normalizePath(target.path),
          label: target.label || path.basename(target.path) || target.path
        }));

    const state = {
      files: [],
      totalBytes: 0,
      warnings: [],
      candidateFiles: 0,
      candidateBytes: 0,
      directoriesVisited: 0,
      currentPath: null,
      lastProgressAt: 0
    };

    for (const target of normalizedTargets) {
      await walkDirectory(target.path, 0, state, mergedOptions);
    }

    const directoryHotspots = this.buildDirectoryHotspots(state.files, mergedOptions.hotspotDirectoryDepth);
    const duplicateGroups = this.buildDuplicateGroups(state.files);

    return {
      scannedAt: new Date().toISOString(),
      targets: normalizedTargets,
      options: mergedOptions,
      files: state.files,
      summary: {
        fileCount: state.files.length,
        totalBytes: state.totalBytes,
        candidateFileCount: state.candidateFiles,
        candidateBytes: state.candidateBytes,
        directoriesVisited: state.directoriesVisited,
        duplicateGroupCount: duplicateGroups.length,
        duplicateFileCount: duplicateGroups.reduce((sum, group) => sum + group.fileCount, 0),
        hotspotDirectoryCount: directoryHotspots.length
      },
      insights: {
        duplicateGroups,
        directoryHotspots
      },
      warnings: state.warnings
    };
  }

  buildDuplicateGroups(files) {
    const map = new Map();

    for (const file of files) {
      if (!file.duplicateKey) {
        continue;
      }

      const group = map.get(file.duplicateKey) || [];
      group.push(file);
      map.set(file.duplicateKey, group);
    }

    return Array.from(map.values())
      .filter((group) => group.length > 1)
      .map((group) => ({
        key: group[0].duplicateKey,
        representativeName: group[0].name,
        sizeBytes: group[0].sizeBytes,
        fileCount: group.length,
        wastedBytes: group[0].sizeBytes * (group.length - 1),
        files: group.map((file) => ({
          id: file.id,
          path: file.path,
          modifiedAt: file.modifiedAt,
          accessedAt: file.accessedAt
        }))
      }))
      .sort((left, right) => right.wastedBytes - left.wastedBytes)
      .slice(0, 30);
  }

  buildDirectoryHotspots(files, depth) {
    const map = new Map();

    for (const file of files) {
      const hotspotPath = buildDirectorySegments(file.path, depth);
      const group = map.get(hotspotPath) || {
        path: hotspotPath,
        fileCount: 0,
        totalBytes: 0,
        candidateCount: 0
      };

      group.fileCount += 1;
      group.totalBytes += file.sizeBytes;

      if (file.categories.length > 0) {
        group.candidateCount += 1;
      }

      map.set(hotspotPath, group);
    }

    return Array.from(map.values())
      .sort((left, right) => right.totalBytes - left.totalBytes)
      .slice(0, 20);
  }
}
