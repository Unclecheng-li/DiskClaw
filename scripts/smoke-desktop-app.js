import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const exePath = path.join(root, "dist", "win-unpacked", "DiskClaw.exe");

async function pathExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function taskKill(pid) {
  return new Promise((resolve) => {
    const killer = spawn("taskkill", ["/PID", String(pid), "/T", "/F"], {
      stdio: "ignore",
      shell: true
    });

    killer.on("exit", () => resolve());
    killer.on("error", () => resolve());
  });
}

async function main() {
  if (!(await pathExists(exePath))) {
    throw new Error(`Packaged desktop executable not found: ${exePath}`);
  }

  const child = spawn(exePath, [], {
    cwd: path.dirname(exePath),
    stdio: "ignore",
    shell: true
  });

  if (!child.pid) {
    throw new Error("Desktop app failed to produce a process id.");
  }

  await delay(8000);

  if (child.exitCode !== null) {
    throw new Error(`Desktop app exited too early with code ${child.exitCode}.`);
  }

  await taskKill(child.pid);
  await delay(2000);

  console.log("Desktop smoke check passed.");
  console.log(`Executable: ${exePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
