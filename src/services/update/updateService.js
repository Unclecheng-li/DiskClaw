function normalizeVersion(input) {
  return String(input || "0.0.0")
    .replace(/^v/i, "")
    .split(/[^0-9]+/)
    .filter(Boolean)
    .map((part) => Number(part) || 0);
}

export function compareVersions(left, right) {
  const a = normalizeVersion(left);
  const b = normalizeVersion(right);
  const length = Math.max(a.length, b.length);

  for (let index = 0; index < length; index += 1) {
    const leftValue = a[index] || 0;
    const rightValue = b[index] || 0;

    if (leftValue > rightValue) {
      return 1;
    }

    if (leftValue < rightValue) {
      return -1;
    }
  }

  return 0;
}

function normalizeNotes(notes) {
  if (Array.isArray(notes)) {
    return notes.filter(Boolean).join("\n");
  }

  return String(notes || "").trim();
}

export class UpdateService {
  async check({ currentVersion, manifestUrl }) {
    const resolvedUrl = String(manifestUrl || "").trim();

    if (!resolvedUrl) {
      return {
        ok: false,
        reason: "更新地址未配置。",
        updateAvailable: false
      };
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(resolvedUrl, {
        headers: {
          Accept: "application/json"
        },
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (!response.ok) {
        return {
          ok: false,
          reason: `更新检查失败：HTTP ${response.status}`,
          updateAvailable: false
        };
      }

      const payload = await response.json();
      const latestVersion = String(payload.version || payload.latestVersion || payload.tag || "").trim();
      const downloadUrl = String(payload.downloadUrl || payload.url || payload.releaseUrl || "").trim();
      const releaseNotes = normalizeNotes(payload.notes || payload.releaseNotes || payload.changelog);

      if (!latestVersion) {
        return {
          ok: false,
          reason: "更新清单未提供版本号。",
          updateAvailable: false
        };
      }

      const updateAvailable = compareVersions(latestVersion, currentVersion) > 0;

      return {
        ok: true,
        updateAvailable,
        currentVersion: String(currentVersion || "").trim(),
        latestVersion,
        downloadUrl,
        releaseNotes,
        manifestUrl: resolvedUrl
      };
    } catch (error) {
      return {
        ok: false,
        reason: error.message || "更新检查失败。",
        updateAvailable: false
      };
    }
  }
}
