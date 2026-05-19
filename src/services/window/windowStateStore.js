import { appPaths } from "../../config/defaults.js";
import { ensureDirectory, readJsonFile, writeJsonFile } from "../../utils/fs.js";
import path from "node:path";

const windowStateFile = path.join(appPaths.dataRoot, "window-state.json");

const defaultState = {
  width: 1440,
  height: 960,
  x: undefined,
  y: undefined,
  isAlwaysOnTop: false,
  closeBehavior: "ask",
  openAtLogin: false
};

export class WindowStateStore {
  async get() {
    await ensureDirectory(appPaths.dataRoot);
    const stored = await readJsonFile(windowStateFile, null);
    return {
      ...defaultState,
      ...(stored || {})
    };
  }

  async save(nextState) {
    await ensureDirectory(appPaths.dataRoot);
    const current = await this.get();
    const payload = {
      ...current,
      ...nextState
    };
    await writeJsonFile(windowStateFile, payload);
    return payload;
  }
}
