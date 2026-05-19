import { appPaths, defaultLlmConfig } from "../../config/defaults.js";
import { decryptSecret, encryptSecret, redactSecret } from "../../utils/crypto.js";
import { ensureDirectory, readJsonFile, writeJsonFile } from "../../utils/fs.js";

function sanitizeConfig(config, decryptedApiKey = "") {
  return {
    ...defaultLlmConfig,
    ...config,
    apiKey: redactSecret(decryptedApiKey),
    hasApiKey: Boolean(decryptedApiKey || config.apiKeyEncrypted)
  };
}

export class LlmConfigStore {
  async loadDecrypted() {
    const stored = await readJsonFile(appPaths.llmConfigFile, null);

    if (!stored) {
      return {
        ...defaultLlmConfig
      };
    }

    const apiKey = stored.apiKeyEncrypted
      ? await decryptSecret(stored.apiKeyEncrypted)
      : "";

    return {
      ...defaultLlmConfig,
      ...stored,
      apiKey
    };
  }

  async loadSanitized() {
    const stored = await readJsonFile(appPaths.llmConfigFile, null);

    if (!stored) {
      return sanitizeConfig(defaultLlmConfig);
    }

    const apiKey = stored.apiKeyEncrypted
      ? await decryptSecret(stored.apiKeyEncrypted)
      : "";

    return sanitizeConfig(stored, apiKey);
  }

  async save(input) {
    await ensureDirectory(appPaths.dataRoot);

    const existing = await readJsonFile(appPaths.llmConfigFile, null);

    const apiKeyEncrypted = input.apiKey
      ? await encryptSecret(input.apiKey)
      : existing?.apiKeyEncrypted || "";

    const decryptedApiKey = input.apiKey
      ? input.apiKey
      : existing?.apiKeyEncrypted
        ? await decryptSecret(existing.apiKeyEncrypted)
        : "";

    const stored = {
      enabled: Boolean(input.enabled),
      provider: input.provider || defaultLlmConfig.provider,
      baseUrl: input.baseUrl || "",
      models: {
        ...defaultLlmConfig.models,
        ...(input.models || {})
      },
      timeoutMs: Number(input.timeoutMs || defaultLlmConfig.timeoutMs),
      maxRetries: Number(input.maxRetries || defaultLlmConfig.maxRetries),
      temperature: Number(input.temperature ?? defaultLlmConfig.temperature),
      apiKeyEncrypted
    };

    await writeJsonFile(appPaths.llmConfigFile, stored);

    return sanitizeConfig(stored, decryptedApiKey);
  }
}
