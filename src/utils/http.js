export async function readJsonBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  const raw = Buffer.concat(chunks).toString("utf8");

  try {
    return JSON.parse(raw);
  } catch {
    const error = new Error("Request body must be valid JSON.");
    error.statusCode = 400;
    throw error;
  }
}

export function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });

  response.end(JSON.stringify(payload, null, 2));
}

export function sendText(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8"
  });

  response.end(payload);
}

export function sendHtml(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "text/html; charset=utf-8"
  });

  response.end(payload);
}

export function sendBinary(response, statusCode, payload, contentType) {
  response.writeHead(statusCode, {
    "Content-Type": contentType
  });

  response.end(payload);
}

export function createHttpError(statusCode, code, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  return error;
}

export function notFound(response) {
  sendJson(response, 404, {
    error: {
      code: "not_found",
      message: "Route not found."
    }
  });
}
