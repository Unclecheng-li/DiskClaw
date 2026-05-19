import fs from "node:fs/promises";
import path from "node:path";
import { appPaths } from "../../config/defaults.js";
import { ensureDirectory, pathExists, readJsonFile, writeJsonFile } from "../../utils/fs.js";

function buildReportId(prefix) {
  return `${prefix}-${Date.now()}`;
}

function flattenExecutionResults(report) {
  if (Array.isArray(report?.results)) {
    return report.results;
  }

  if (Array.isArray(report?.groupResults)) {
    return report.groupResults.flatMap((item) => item.cleanupResults || []);
  }

  if (Array.isArray(report?.hotspotResults)) {
    return report.hotspotResults.flatMap((item) => item.cleanupResults || []);
  }

  return [];
}

export class ReportStore {
  async save(prefix, report) {
    await ensureDirectory(appPaths.reportsDir);
    const reportId = buildReportId(prefix);
    const reportPath = path.join(appPaths.reportsDir, `${reportId}.json`);
    await writeJsonFile(reportPath, {
      reportId,
      createdAt: new Date().toISOString(),
      ...report
    });
    return {
      reportId,
      reportPath
    };
  }

  async list() {
    await ensureDirectory(appPaths.reportsDir);
    return readJsonFile(path.join(appPaths.reportsDir, "index.json"), []);
  }

  async get(reportId) {
    await ensureDirectory(appPaths.reportsDir);
    return readJsonFile(path.join(appPaths.reportsDir, `${reportId}.json`), null);
  }

  async appendIndex(entry) {
    await ensureDirectory(appPaths.reportsDir);
    const indexPath = path.join(appPaths.reportsDir, "index.json");
    const index = await readJsonFile(indexPath, []);
    index.unshift(entry);
    await writeJsonFile(indexPath, index.slice(0, 100));
  }

  async analytics() {
    const index = await this.list();
    const now = Date.now();

    const summarize = async (days) => {
      const since = now - days * 24 * 60 * 60 * 1000;
      const entries = index.filter((item) => Date.parse(item.createdAt || 0) >= since);
      let reclaimedBytes = 0;

      for (const entry of entries) {
        const report = await this.get(entry.reportId);
        if (report?.analysis?.candidateSummary?.reclaimableBytes) {
          reclaimedBytes += report.analysis.candidateSummary.reclaimableBytes;
          continue;
        }

        const rows = flattenExecutionResults(report);
        if (rows.length > 0) {
          reclaimedBytes += rows.reduce((sum, item) => {
            if (["moved", "archived", "deleted", "recycled", "planned", "purged"].includes(item.status)) {
              return sum + Number(item.sizeBytes || 0);
            }
            return sum;
          }, 0);
        }
      }

      return {
        days,
        reportCount: entries.length,
        reclaimedBytes
      };
    };

    return {
      last7Days: await summarize(7),
      last30Days: await summarize(30)
    };
  }

  async export(reportId, format = "json") {
    await ensureDirectory(appPaths.exportsDir);
    const report = await this.get(reportId);

    if (!report) {
      return null;
    }

    if (format === "json") {
      const exportPath = path.join(appPaths.exportsDir, `${reportId}.json`);
      await writeJsonFile(exportPath, report);
      return {
        format,
        exportPath
      };
    }

    if (format === "md") {
      const exportPath = path.join(appPaths.exportsDir, `${reportId}.md`);
      const summary =
        report.analysis?.summaryText ||
        report.message ||
        report.llm?.output?.userMessage ||
        "No summary available.";
      const content = [
        `# ${reportId}`,
        ``,
        `- 创建时间：${report.createdAt || "未知"}`,
        `- 类型：${report.type || "unknown"}`,
        ``,
        `## 摘要`,
        ``,
        summary,
        ``,
        `## 原始数据`,
        ``,
        "```json",
        JSON.stringify(report, null, 2),
        "```"
      ].join("\n");
      await fs.writeFile(exportPath, content, "utf8");
      return {
        format,
        exportPath
      };
    }

    return null;
  }

  async deleteMany(reportIds = []) {
    await ensureDirectory(appPaths.reportsDir);
    const uniqueIds = Array.from(new Set((reportIds || []).filter(Boolean)));
    const indexPath = path.join(appPaths.reportsDir, "index.json");
    const index = await readJsonFile(indexPath, []);
    const results = [];

    for (const reportId of uniqueIds) {
      const reportPath = path.join(appPaths.reportsDir, `${reportId}.json`);
      const reportExists = await pathExists(reportPath);
      const indexBefore = index.length;
      const nextIndex = index.filter((item) => item.reportId !== reportId);
      const removedFromIndex = nextIndex.length !== indexBefore;

      if (removedFromIndex) {
        index.splice(0, index.length, ...nextIndex);
      }

      if (reportExists) {
        await fs.rm(reportPath, { force: true });
      }

      results.push({
        reportId,
        status: reportExists || removedFromIndex ? "deleted" : "missing",
        removedFromIndex,
        removedFile: reportExists
      });
    }

    await writeJsonFile(indexPath, index);

    return {
      deletedAt: new Date().toISOString(),
      results,
      statusCounts: results.reduce((accumulator, item) => {
        const key = item.status || "unknown";
        accumulator[key] = (accumulator[key] || 0) + 1;
        return accumulator;
      }, {})
    };
  }
}
