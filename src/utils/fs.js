import fs from "node:fs/promises";

export async function ensureDirectory(directoryPath) {
  await fs.mkdir(directoryPath, { recursive: true });
}

export async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export async function readJsonFile(filePath, fallbackValue = null) {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const normalized = raw.replace(/^\uFEFF/, "");
    return JSON.parse(normalized);
  } catch (error) {
    if (error.code === "ENOENT") {
      return fallbackValue;
    }

    throw error;
  }
}

export async function writeJsonFile(filePath, value) {
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}
