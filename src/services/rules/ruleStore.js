import { appPaths, defaultRulesConfig } from "../../config/defaults.js";
import { ensureDirectory, readJsonFile, writeJsonFile } from "../../utils/fs.js";

export class RuleStore {
  async get() {
    await ensureDirectory(appPaths.dataRoot);
    const stored = await readJsonFile(appPaths.rulesFile, null);
    return {
      ...defaultRulesConfig,
      ...(stored || {})
    };
  }

  async save(input) {
    await ensureDirectory(appPaths.dataRoot);
    const next = {
      excludePaths: Array.isArray(input.excludePaths) ? input.excludePaths : [],
      whitelistPaths: Array.isArray(input.whitelistPaths) ? input.whitelistPaths : [],
      blacklistPaths: Array.isArray(input.blacklistPaths) ? input.blacklistPaths : []
    };
    await writeJsonFile(appPaths.rulesFile, next);
    return next;
  }
}
