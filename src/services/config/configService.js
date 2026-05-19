import fs from "node:fs/promises";
import path from "node:path";
import { appPaths, defaultLlmConfig, defaultPreferences, defaultRulesConfig } from "../../config/defaults.js";
import { writeJsonFile } from "../../utils/fs.js";
import { syncSystemMaintenanceSchedule } from "../schedules/systemScheduleSync.js";

const defaultOnboardingState = {
  completed: false,
  completedAt: null,
  dismissedAt: null
};

const defaultWindowState = {
  width: 1440,
  height: 960,
  x: undefined,
  y: undefined,
  isAlwaysOnTop: false,
  closeBehavior: "ask",
  openAtLogin: false
};

const windowStateFile = path.join(appPaths.dataRoot, "window-state.json");

async function deleteIfExists(filePath) {
  await fs.rm(filePath, {
    force: true
  });
}

export class ConfigService {
  constructor({
    llmConfigStore,
    onboardingStore,
    preferenceStore,
    ruleStore,
    scheduleStore,
    windowStateStore
  }) {
    this.llmConfigStore = llmConfigStore;
    this.onboardingStore = onboardingStore;
    this.preferenceStore = preferenceStore;
    this.ruleStore = ruleStore;
    this.scheduleStore = scheduleStore;
    this.windowStateStore = windowStateStore;
  }

  async backup() {
    return {
      version: "v1",
      createdAt: new Date().toISOString(),
      preferences: await this.preferenceStore.get(),
      rules: await this.ruleStore.get(),
      onboarding: await this.onboardingStore.get(),
      schedules: await this.scheduleStore.list(),
      windowState: await this.windowStateStore.get(),
      llmConfig: await this.llmConfigStore.loadDecrypted()
    };
  }

  async restore(payload = {}) {
    const results = {};

    if (payload.preferences) {
      results.preferences = await this.preferenceStore.save(payload.preferences);
      await syncSystemMaintenanceSchedule(this.scheduleStore, results.preferences);
    }

    if (payload.rules) {
      results.rules = await this.ruleStore.save(payload.rules);
    }

    if (payload.onboarding) {
      results.onboarding = await this.onboardingStore.save(payload.onboarding);
    }

    if (payload.llmConfig) {
      results.llmConfig = await this.llmConfigStore.save(payload.llmConfig);
    }

    if (Array.isArray(payload.schedules)) {
      await writeJsonFile(appPaths.schedulesFile, payload.schedules);
      results.schedules = payload.schedules;
    } else if (results.preferences) {
      await syncSystemMaintenanceSchedule(this.scheduleStore, results.preferences);
    }

    if (payload.windowState) {
      results.windowState = await this.windowStateStore.save(payload.windowState);
    }

    return {
      restoredAt: new Date().toISOString(),
      ...results
    };
  }

  async resetAll() {
    await deleteIfExists(appPaths.preferencesFile);
    await deleteIfExists(appPaths.rulesFile);
    await deleteIfExists(appPaths.onboardingFile);
    await deleteIfExists(appPaths.schedulesFile);
    await deleteIfExists(windowStateFile);
    await deleteIfExists(appPaths.llmConfigFile);

    const preferences = await this.preferenceStore.save(defaultPreferences);
    const rules = await this.ruleStore.save(defaultRulesConfig);
    const onboarding = await this.onboardingStore.save(defaultOnboardingState);
    const windowState = await this.windowStateStore.save(defaultWindowState);
    const llmConfig = await this.llmConfigStore.save(defaultLlmConfig);

    await deleteIfExists(appPaths.schedulesFile);
    await writeJsonFile(appPaths.schedulesFile, []);

    return {
      resetAt: new Date().toISOString(),
      preferences,
      rules,
      onboarding,
      windowState,
      llmConfig
    };
  }
}
