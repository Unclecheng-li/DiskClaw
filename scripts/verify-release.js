import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();

async function pathExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: root,
      shell: true,
      stdio: "inherit"
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} failed with exit code ${code}`));
      }
    });
  });
}

async function main() {
  console.log("Running release verification...");

  await runCommand("npm", ["test"]);
  await runCommand("npm", ["run", "pack"]);
  await runCommand("npm", ["run", "smoke:desktop"]);

  const requiredPaths = [
    path.join(root, "dist", "win-unpacked"),
    path.join(root, "electron", "icon.png"),
    path.join(root, "electron", "icon.ico"),
    path.join(root, "docs", "发布检查清单.md"),
    path.join(root, "docs", "版本说明-0.1.0.md")
  ];

  for (const target of requiredPaths) {
    if (!(await pathExists(target))) {
      throw new Error(`Required artifact missing: ${target}`);
    }
  }

  console.log("Release verification passed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
