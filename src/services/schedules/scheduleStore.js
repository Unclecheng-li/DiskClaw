import crypto from "node:crypto";
import { appPaths } from "../../config/defaults.js";
import { ensureDirectory, readJsonFile, writeJsonFile } from "../../utils/fs.js";

function buildScheduleId() {
  return `schedule-${Date.now()}-${crypto.randomBytes(3).toString("hex")}`;
}

function normalizeSchedule(input) {
  const now = new Date().toISOString();
  const intervalMinutes = Math.max(5, Number(input.intervalMinutes || 60));
  return {
    id: input.id || buildScheduleId(),
    name: input.name || "未命名计划",
    source: input.source || "user",
    enabled: input.enabled !== false,
    action: input.action || "plan-only",
    cleanupMode: input.cleanupMode || "quarantine",
    dryRun: input.dryRun !== false,
    maxItems: Math.max(1, Number(input.maxItems || 10)),
    intervalMinutes,
    targets: Array.isArray(input.targets) ? input.targets : [],
    options: input.options || {},
    archiveDir: input.archiveDir || "",
    lastRunAt: input.lastRunAt || null,
    nextRunAt: input.nextRunAt || now,
    createdAt: input.createdAt || now,
    updatedAt: now
  };
}

export class ScheduleStore {
  async list() {
    await ensureDirectory(appPaths.dataRoot);
    const stored = await readJsonFile(appPaths.schedulesFile, []);
    return Array.isArray(stored) ? stored : [];
  }

  async save(scheduleInput) {
    const schedules = await this.list();
    const normalized = normalizeSchedule(scheduleInput);
    const index = schedules.findIndex((item) => item.id === normalized.id);

    if (index >= 0) {
      schedules[index] = normalized;
    } else {
      schedules.unshift(normalized);
    }

    await writeJsonFile(appPaths.schedulesFile, schedules);
    return normalized;
  }

  async remove(scheduleId) {
    const schedules = await this.list();
    const next = schedules.filter((item) => item.id !== scheduleId);
    await writeJsonFile(appPaths.schedulesFile, next);
    return {
      deleted: schedules.length !== next.length
    };
  }
}
