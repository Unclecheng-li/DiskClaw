import { createHttpError } from "./http.js";

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateTargets(targets) {
  if (!Array.isArray(targets) || targets.length === 0) {
    throw createHttpError(400, "invalid_targets", "At least one scan target is required.");
  }

  for (const target of targets) {
    if (!isNonEmptyString(target?.path)) {
      throw createHttpError(400, "invalid_target_path", "Each target must include a non-empty path.");
    }
  }
}

export function validateLlmConfig(config) {
  if (!config || typeof config !== "object") {
    throw createHttpError(400, "invalid_config", "LLM configuration payload is required.");
  }

  if (config.enabled) {
    if (!isNonEmptyString(config.baseUrl)) {
      throw createHttpError(400, "invalid_base_url", "baseUrl is required when LLM is enabled.");
    }

    if (!isNonEmptyString(config.apiKey) && !config.hasApiKey) {
      throw createHttpError(400, "invalid_api_key", "apiKey is required when LLM is enabled.");
    }
  }
}

export function validateQuestion(question) {
  if (!isNonEmptyString(question)) {
    throw createHttpError(400, "invalid_question", "question is required.");
  }
}

export function validateCleanupItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw createHttpError(400, "invalid_cleanup_items", "At least one cleanup item is required.");
  }

  for (const item of items) {
    if (!isNonEmptyString(item?.path)) {
      throw createHttpError(400, "invalid_cleanup_path", "Each cleanup item must include a path.");
    }
  }
}

export function validateDuplicateResolutionGroups(groups) {
  if (!Array.isArray(groups) || groups.length === 0) {
    throw createHttpError(
      400,
      "invalid_duplicate_groups",
      "At least one duplicate resolution group is required."
    );
  }

  for (const group of groups) {
    if (!Array.isArray(group?.cleanupCandidates) || group.cleanupCandidates.length === 0) {
      throw createHttpError(
        400,
        "invalid_duplicate_cleanup_candidates",
        "Each duplicate resolution group must include cleanupCandidates."
      );
    }

    for (const item of group.cleanupCandidates) {
      if (!isNonEmptyString(item?.path)) {
        throw createHttpError(
          400,
          "invalid_duplicate_cleanup_path",
          "Each duplicate cleanup candidate must include a path."
        );
      }
    }
  }
}

export function validateDirectoryHotspotGroups(groups) {
  if (!Array.isArray(groups) || groups.length === 0) {
    throw createHttpError(
      400,
      "invalid_hotspot_groups",
      "At least one directory hotspot group is required."
    );
  }

  for (const group of groups) {
    if (!isNonEmptyString(group?.path)) {
      throw createHttpError(
        400,
        "invalid_hotspot_path",
        "Each hotspot group must include a path."
      );
    }

    if (!Array.isArray(group?.cleanupCandidates) || group.cleanupCandidates.length === 0) {
      throw createHttpError(
        400,
        "invalid_hotspot_cleanup_candidates",
        "Each hotspot group must include cleanupCandidates."
      );
    }

    for (const item of group.cleanupCandidates) {
      if (!isNonEmptyString(item?.path)) {
        throw createHttpError(
          400,
          "invalid_hotspot_cleanup_path",
          "Each hotspot cleanup candidate must include a path."
        );
      }
    }
  }
}

export function validateRestoreItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw createHttpError(400, "invalid_restore_items", "At least one quarantine item is required.");
  }

  for (const item of items) {
    if (!isNonEmptyString(item?.id) && !isNonEmptyString(item?.quarantinePath)) {
      throw createHttpError(
        400,
        "invalid_restore_reference",
        "Each restore request must include either id or quarantinePath."
      );
    }
  }
}

export function validateQuarantineItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw createHttpError(400, "invalid_quarantine_items", "At least one quarantine item is required.");
  }

  for (const item of items) {
    if (!isNonEmptyString(item?.id) && !isNonEmptyString(item?.quarantinePath)) {
      throw createHttpError(
        400,
        "invalid_quarantine_reference",
        "Each quarantine request must include either id or quarantinePath."
      );
    }
  }
}

export function validateRuleConfig(config) {
  if (!config || typeof config !== "object") {
    throw createHttpError(400, "invalid_rules", "Rule configuration payload is required.");
  }
}

export function validatePreferences(config) {
  if (!config || typeof config !== "object") {
    throw createHttpError(400, "invalid_preferences", "Preference payload is required.");
  }
}

export function validateSchedule(input) {
  if (!input || typeof input !== "object") {
    throw createHttpError(400, "invalid_schedule", "Schedule payload is required.");
  }

  if (!Array.isArray(input.targets) || input.targets.length === 0) {
    throw createHttpError(400, "invalid_schedule_targets", "Schedule must include at least one target.");
  }
}
