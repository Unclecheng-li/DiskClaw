import { appPaths, defaultPreferences } from "../../config/defaults.js";
import { ensureDirectory, readJsonFile, writeJsonFile } from "../../utils/fs.js";

function uniqueRecentTargets(targets = []) {
  return Array.from(new Set(targets.filter(Boolean))).slice(0, 10);
}

function normalizeNotifications(input = {}) {
  return {
    ...defaultPreferences.notifications,
    ...(input || {})
  };
}

export class PreferenceStore {
  async get() {
    await ensureDirectory(appPaths.dataRoot);
    const stored = await readJsonFile(appPaths.preferencesFile, null);
    return {
      ...defaultPreferences,
      ...(stored || {}),
      notifications: normalizeNotifications(stored?.notifications)
    };
  }

  async save(input) {
    await ensureDirectory(appPaths.dataRoot);
    const current = await this.get();
    const next = {
      ...current,
      ...input,
      defaultScanTarget: input.defaultScanTarget === undefined
        ? current.defaultScanTarget
        : String(input.defaultScanTarget || "").trim(),
      recentTargets: input.recentTargets === undefined
        ? current.recentTargets
        : uniqueRecentTargets(input.recentTargets || []),
      notifications: normalizeNotifications(input.notifications)
    };
    await writeJsonFile(appPaths.preferencesFile, next);
    return next;
  }

  async rememberTarget(targetPath) {
    const current = await this.get();
    const next = {
      ...current,
      recentTargets: uniqueRecentTargets([targetPath, ...(current.recentTargets || [])])
    };
    await writeJsonFile(appPaths.preferencesFile, next);
    return next;
  }
}
