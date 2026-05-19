import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = process.cwd();
const demoRoot = path.join(root, "demo", "demo-data");
const currentFile = fileURLToPath(import.meta.url);

async function ensureDir(target) {
  await fs.mkdir(target, { recursive: true });
}

async function writeSizedFile(target, sizeBytes, fillByte) {
  const chunk = Buffer.alloc(1024 * 1024, fillByte);
  const handle = await fs.open(target, "w");
  try {
    let written = 0;
    while (written < sizeBytes) {
      const remaining = sizeBytes - written;
      const current = remaining >= chunk.length ? chunk : chunk.subarray(0, remaining);
      await handle.write(current);
      written += current.length;
    }
  } finally {
    await handle.close();
  }
}

export async function createDemoData() {
  await fs.rm(demoRoot, { recursive: true, force: true });

  const downloadsDir = path.join(demoRoot, "Downloads");
  const archivesDir = path.join(demoRoot, "Archives");
  const tempDir = path.join(demoRoot, "AppData", "Local", "Temp");
  const cacheDir = path.join(demoRoot, "Workspace", "build", "cache");

  await Promise.all([
    ensureDir(downloadsDir),
    ensureDir(archivesDir),
    ensureDir(tempDir),
    ensureDir(cacheDir)
  ]);

  const duplicateSize = 12 * 1024 * 1024;
  await writeSizedFile(path.join(downloadsDir, "setup.iso"), duplicateSize, 65);
  await writeSizedFile(path.join(archivesDir, "setup.iso"), duplicateSize, 65);
  await writeSizedFile(path.join(downloadsDir, "video-backup.zip"), 14 * 1024 * 1024, 66);
  await fs.writeFile(path.join(tempDir, "session.log"), "temporary log output\n".repeat(2000), "utf8");
  await fs.writeFile(path.join(cacheDir, "build.trace"), "build cache trace\n".repeat(3000), "utf8");

  const staleDate = new Date("2025-01-01T00:00:00.000Z");
  const allFiles = [
    path.join(downloadsDir, "setup.iso"),
    path.join(archivesDir, "setup.iso"),
    path.join(downloadsDir, "video-backup.zip"),
    path.join(tempDir, "session.log"),
    path.join(cacheDir, "build.trace")
  ];

  await Promise.all(allFiles.map((file) => fs.utimes(file, staleDate, staleDate)));

  return {
    demoRoot,
    allFiles
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(currentFile)) {
  createDemoData()
    .then((result) => {
      console.log("Demo data ready:");
      console.log(result.demoRoot);
    })
    .catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
}
