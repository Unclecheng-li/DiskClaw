function withTimeout(timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  return {
    controller,
    clear() {
      clearTimeout(timeout);
    }
  };
}

function normalizeTextContent(content) {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }

        if (part?.type === "text") {
          return part.text;
        }

        return "";
      })
      .join("\n")
      .trim();
  }

  return "";
}

function buildError(message, statusCode = 500, code = "llm_error") {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  return error;
}

export class OpenAiCompatibleClient {
  constructor(config) {
    this.config = config;
  }

  async chat({
    messages,
    model,
    temperature,
    maxTokens = 600,
    timeoutMs
  }) {
    const attempts = Math.max(1, this.config.maxRetries + 1);
    let lastError;

    for (let attempt = 1; attempt <= attempts; attempt += 1) {
      try {
        const timeout = withTimeout(timeoutMs || this.config.timeoutMs);
        const response = await fetch(`${this.config.baseUrl.replace(/\/$/, "")}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.config.apiKey}`
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: temperature ?? this.config.temperature,
            max_tokens: maxTokens
          }),
          signal: timeout.controller.signal
        });
        timeout.clear();

        if (!response.ok) {
          const text = await response.text();
          throw buildError(
            `LLM request failed with status ${response.status}: ${text}`,
            response.status,
            "llm_http_error"
          );
        }

        const payload = await response.json();
        const content = normalizeTextContent(payload?.choices?.[0]?.message?.content);

        if (!content) {
          throw buildError("LLM response did not contain message content.", 502, "llm_invalid_response");
        }

        return {
          model: payload.model || model,
          text: content,
          raw: payload
        };
      } catch (error) {
        lastError = error.name === "AbortError"
          ? buildError("LLM request timed out.", 504, "llm_timeout")
          : error;

        if (attempt === attempts) {
          throw lastError;
        }
      }
    }

    throw lastError;
  }

  async healthcheck() {
    return this.chat({
      model: this.config.models.chat || this.config.models.reason || this.config.models.summary,
      messages: [
        {
          role: "system",
          content: "Respond with the single word OK."
        },
        {
          role: "user",
          content: "Health check"
        }
      ],
      temperature: 0,
      maxTokens: 5,
      timeoutMs: Math.min(this.config.timeoutMs, 10000)
    });
  }
}
