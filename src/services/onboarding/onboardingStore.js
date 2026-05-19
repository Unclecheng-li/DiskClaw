import { appPaths } from "../../config/defaults.js";
import { ensureDirectory, readJsonFile, writeJsonFile } from "../../utils/fs.js";

const defaultOnboardingState = {
  completed: false,
  completedAt: null,
  dismissedAt: null
};

export class OnboardingStore {
  async get() {
    await ensureDirectory(appPaths.dataRoot);
    const stored = await readJsonFile(appPaths.onboardingFile, null);
    return {
      ...defaultOnboardingState,
      ...(stored || {})
    };
  }

  async save(input) {
    await ensureDirectory(appPaths.dataRoot);
    const nextState = {
      ...defaultOnboardingState,
      ...input
    };
    await writeJsonFile(appPaths.onboardingFile, nextState);
    return nextState;
  }

  async complete() {
    return this.save({
      completed: true,
      completedAt: new Date().toISOString()
    });
  }

  async dismiss() {
    return this.save({
      dismissedAt: new Date().toISOString()
    });
  }
}
