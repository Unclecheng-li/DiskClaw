import { OpenAiCompatibleClient } from "./openAiCompatibleClient.js";

export class LlmGateway {
  constructor(configStore) {
    this.configStore = configStore;
  }

  normalizeRuntimeConfig(input) {
    if (!input) {
      return null;
    }

    return {
      enabled: Boolean(input.enabled),
      provider: input.provider || "openai-compatible",
      baseUrl: input.baseUrl || "",
      apiKey: input.apiKey || "",
      models: {
        chat: input?.models?.chat || "",
        reason: input?.models?.reason || "",
        summary: input?.models?.summary || ""
      },
      timeoutMs: Number(input.timeoutMs || 20000),
      maxRetries: Number(input.maxRetries || 1),
      temperature: Number(input.temperature ?? 0.2)
    };
  }

  async getRuntimeConfig() {
    const config = this.normalizeRuntimeConfig(await this.configStore.loadDecrypted());

    if (!config.enabled || !config.baseUrl || !config.apiKey) {
      return null;
    }

    if (!config.models.chat && !config.models.reason && !config.models.summary) {
      return null;
    }

    return config;
  }

  async healthcheck(overrideConfig = null) {
    const config = overrideConfig
      ? this.normalizeRuntimeConfig(overrideConfig)
      : await this.getRuntimeConfig();

    if (!config) {
      return {
        ok: false,
        reason: "LLM is not configured."
      };
    }

    const client = new OpenAiCompatibleClient(config);
    const result = await client.healthcheck();

    return {
      ok: true,
      model: result.model,
      response: result.text
    };
  }

  async chat(messages, capability = "chat", options = {}) {
    const config = await this.getRuntimeConfig();

    if (!config) {
      return {
        ok: false,
        degraded: true,
        reason: "LLM is not configured."
      };
    }

    const model = config.models[capability] || config.models.chat || config.models.reason || config.models.summary;
    const client = new OpenAiCompatibleClient(config);
    const result = await client.chat({
      messages,
      model,
      temperature: options.temperature,
      maxTokens: options.maxTokens,
      timeoutMs: options.timeoutMs
    });

    return {
      ok: true,
      model: result.model,
      text: result.text,
      raw: result.raw
    };
  }
}
