import os from "node:os";
import path from "node:path";

const workspaceRoot = process.cwd();
const dataRoot = path.join(workspaceRoot, ".diskclaw");

export const appPaths = {
  workspaceRoot,
  dataRoot,
  keyFile: path.join(dataRoot, "master.key"),
  llmConfigFile: path.join(dataRoot, "llm-config.json"),
  onboardingFile: path.join(dataRoot, "onboarding.json"),
  rulesFile: path.join(dataRoot, "rules.json"),
  preferencesFile: path.join(dataRoot, "preferences.json"),
  schedulesFile: path.join(dataRoot, "schedules.json"),
  reportsDir: path.join(dataRoot, "reports"),
  quarantineDir: path.join(dataRoot, "quarantine"),
  exportsDir: path.join(dataRoot, "exports"),
  archiveDir: path.join(dataRoot, "archive")
};

export const defaultScanOptions = {
  maxDepth: 5,
  maxFiles: 3000,
  includeHidden: false,
  largeFileThresholdBytes: 512 * 1024 * 1024,
  staleDays: 90,
  followSymlinks: false,
  duplicateMinSizeBytes: 10 * 1024 * 1024,
  hotspotDirectoryDepth: 3
};

export const defaultLlmConfig = {
  enabled: false,
  provider: "openai-compatible",
  baseUrl: "",
  apiKey: "",
  models: {
    chat: "",
    reason: "",
    summary: ""
  },
  timeoutMs: 20000,
  maxRetries: 1,
  temperature: 0.2
};

export const defaultRulesConfig = {
  excludePaths: [],
  whitelistPaths: [],
  blacklistPaths: []
};

export const defaultPreferences = {
  defaultCleanupMode: "quarantine",
  defaultScanTarget: "",
  recentTargets: [],
  preferredTaskFilter: "all",
  preferredReportFilter: "all",
  rememberLastPanel: true,
  autoScanEnabled: false,
  autoScanInterval: "weekly",
  autoCleanupEnabled: false,
  quarantineRetentionDays: 30,
  notifications: {
    scanComplete: true,
    cleanupComplete: true,
    errors: true
  },
  language: "zh-CN",
  checkUpdates: "auto",
  updateManifestUrl: "",
  rememberWindowBounds: true
};

export const protectedPathPatterns = process.platform === "win32"
  ? [
      /^C:\\Windows/i,
      /^C:\\Program Files/i,
      /^C:\\Program Files \(x86\)/i,
      /^C:\\ProgramData/i
    ]
  : [/^\/System/i, /^\/Library/i, /^\/usr/i, /^\/bin/i];

export const homeDirectory = os.homedir();
