import crypto from "node:crypto";
import fs from "node:fs/promises";
import { appPaths } from "../config/defaults.js";
import { ensureDirectory, pathExists } from "./fs.js";

async function loadOrCreateKeyMaterial() {
  if (process.env.DISKCLAW_MASTER_KEY) {
    return crypto.scryptSync(process.env.DISKCLAW_MASTER_KEY, "diskclaw", 32);
  }

  await ensureDirectory(appPaths.dataRoot);

  if (await pathExists(appPaths.keyFile)) {
    const base64Key = await fs.readFile(appPaths.keyFile, "utf8");
    return Buffer.from(base64Key, "base64");
  }

  const key = crypto.randomBytes(32);
  await fs.writeFile(appPaths.keyFile, key.toString("base64"), "utf8");
  return key;
}

export async function encryptSecret(secret) {
  if (!secret) {
    return "";
  }

  const key = await loadOrCreateKeyMaterial();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(secret, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return JSON.stringify({
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
    ciphertext: encrypted.toString("base64")
  });
}

export async function decryptSecret(payload) {
  if (!payload) {
    return "";
  }

  const key = await loadOrCreateKeyMaterial();
  const parsed = JSON.parse(payload);
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(parsed.iv, "base64")
  );

  decipher.setAuthTag(Buffer.from(parsed.authTag, "base64"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(parsed.ciphertext, "base64")),
    decipher.final()
  ]);

  return decrypted.toString("utf8");
}

export function redactSecret(secret) {
  if (!secret) {
    return "";
  }

  if (secret.length <= 8) {
    return "*".repeat(secret.length);
  }

  return `${secret.slice(0, 4)}${"*".repeat(secret.length - 8)}${secret.slice(-4)}`;
}
