import { defaultScanOptions } from "../../config/defaults.js";

export const systemMaintenanceScheduleId = "system-auto-maintenance";

export function mapAutoScanIntervalToMinutes(value) {
  if (value === "daily") {
    return 24 * 60;
  }

  if (value === "monthly") {
    return 30 * 24 * 60;
  }

  return 7 * 24 * 60;
}

function shouldResetNextRun(existing = null, next = null) {
  if (!existing || !next) {
    return true;
  }

  const existingTarget = existing.targets?.[0]?.path || "";
  const nextTarget = next.targets?.[0]?.path || "";

  return (
    existing.action !== next.action ||
    existing.intervalMinutes !== next.intervalMinutes ||
    existing.cleanupMode !== next.cleanupMode ||
    existingTarget !== nextTarget
  );
}

export function buildSystemMaintenanceSchedule(preferences = {}, existing = null) {
  const targetPath = String(preferences.defaultScanTarget || preferences.recentTargets?.[0] || "").trim();
  const enabled = Boolean(targetPath) && Boolean(preferences.autoScanEnabled || preferences.autoCleanupEnabled);

  if (!enabled) {
    return null;
  }

  const now = new Date().toISOString();

  const next = {
    ...existing,
    id: systemMaintenanceScheduleId,
    name: preferences.autoCleanupEnabled ? "自动扫描与清理" : "自动扫描",
    source: "system-preferences",
    enabled: true,
    action: preferences.autoCleanupEnabled ? "auto-cleanup" : "plan-only",
    cleanupMode: preferences.defaultCleanupMode || "quarantine",
    dryRun: false,
    maxItems: 20,
    intervalMinutes: mapAutoScanIntervalToMinutes(preferences.autoScanInterval),
    targets: [
      {
        path: targetPath,
        label: "默认扫描目录"
      }
    ],
    options: {
      maxDepth: defaultScanOptions.maxDepth,
      maxFiles: defaultScanOptions.maxFiles,
      largeFileThresholdBytes: defaultScanOptions.largeFileThresholdBytes,
      staleDays: defaultScanOptions.staleDays
    },
    archiveDir: "",
    lastRunAt: existing?.lastRunAt || null,
    nextRunAt: existing?.nextRunAt || now,
    createdAt: existing?.createdAt || now
  };

  if (shouldResetNextRun(existing, next)) {
    next.nextRunAt = now;
  }

  return next;
}

export async function syncSystemMaintenanceSchedule(scheduleStore, preferences = {}) {
  const schedules = await scheduleStore.list();
  const existing = schedules.find((item) => item.id === systemMaintenanceScheduleId) || null;
  const next = buildSystemMaintenanceSchedule(preferences, existing);

  if (!next) {
    if (existing) {
      await scheduleStore.remove(existing.id);
      return {
        deleted: true,
        schedule: null
      };
    }

    return {
      deleted: false,
      schedule: null
    };
  }

  const saved = await scheduleStore.save(next);

  return {
    deleted: false,
    schedule: saved
  };
}
