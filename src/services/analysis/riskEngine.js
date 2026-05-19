import path from "node:path";
import { homeDirectory, protectedPathPatterns } from "../../config/defaults.js";

function isProtectedPath(filePath) {
  return protectedPathPatterns.some((pattern) => pattern.test(filePath));
}

function isUserCriticalArea(filePath) {
  const normalized = filePath.toLowerCase();
  const home = homeDirectory.toLowerCase();

  return normalized.startsWith(home.toLowerCase()) && (
    normalized.includes("\\desktop\\") ||
    normalized.includes("\\documents\\") ||
    normalized.includes("/desktop/") ||
    normalized.includes("/documents/")
  );
}

function buildAction(category, riskLevel) {
  if (riskLevel === "high") {
    return "manual-review";
  }

  if (category === "large-file" || category === "installer") {
    return "quarantine";
  }

  return "delete";
}

export function evaluateRisk(file) {
  if (file.policy?.whitelisted) {
    return {
      level: "high",
      reasons: ["File is protected by a user whitelist rule."],
      deletionAllowed: false,
      recommendedAction: "manual-review"
    };
  }

  if (isProtectedPath(file.path)) {
    return {
      level: "high",
      reasons: ["File is inside a protected system path."],
      deletionAllowed: false,
      recommendedAction: "manual-review"
    };
  }

  if (isUserCriticalArea(file.path) && !file.categories.includes("temp")) {
    return {
      level: "high",
      reasons: ["File is inside a user-critical area such as Desktop or Documents."],
      deletionAllowed: false,
      recommendedAction: "manual-review"
    };
  }

  if (file.categories.includes("temp") || file.categories.includes("cache") || file.categories.includes("recycle-bin") || file.categories.includes("log")) {
    return {
      level: "low",
      reasons: ["File belongs to a low-risk cleanup category."],
      deletionAllowed: true,
      recommendedAction: buildAction(file.categories[0], "low")
    };
  }

  if (file.categories.includes("user-blacklist")) {
    return {
      level: "medium",
      reasons: ["File is explicitly marked by a user blacklist rule."],
      deletionAllowed: true,
      recommendedAction: "quarantine"
    };
  }

  if (file.categories.includes("installer") || file.categories.includes("stale") || file.categories.includes("large-file")) {
    return {
      level: "medium",
      reasons: ["File likely requires confirmation before cleanup."],
      deletionAllowed: true,
      recommendedAction: buildAction(file.categories[0], "medium")
    };
  }

  return {
    level: "high",
    reasons: ["System could not confidently classify the file as safe to clean."],
    deletionAllowed: false,
    recommendedAction: "manual-review"
  };
}

export function summarizeRiskCounts(candidates) {
  return candidates.reduce(
    (accumulator, item) => {
      accumulator[item.risk.level] += 1;
      return accumulator;
    },
    {
      low: 0,
      medium: 0,
      high: 0
    }
  );
}

export function groupByCategory(candidates) {
  const groups = {};

  for (const candidate of candidates) {
    const category = candidate.primaryCategory;
    const group = groups[category] ?? {
      category,
      count: 0,
      totalBytes: 0
    };

    group.count += 1;
    group.totalBytes += candidate.sizeBytes;
    groups[category] = group;
  }

  return Object.values(groups).sort((left, right) => right.totalBytes - left.totalBytes);
}

export function chooseDuplicateKeepCandidate(files) {
  const ranked = [...files].sort((left, right) => {
    const leftRisk = evaluateRisk({
      path: left.path,
      categories: left.categories || []
    });
    const rightRisk = evaluateRisk({
      path: right.path,
      categories: right.categories || []
    });

    const riskWeight = {
      high: 3,
      medium: 2,
      low: 1
    };

    if (riskWeight[leftRisk.level] !== riskWeight[rightRisk.level]) {
      return riskWeight[rightRisk.level] - riskWeight[leftRisk.level];
    }

    const leftAccessed = Date.parse(left.accessedAt || 0);
    const rightAccessed = Date.parse(right.accessedAt || 0);

    if (leftAccessed !== rightAccessed) {
      return rightAccessed - leftAccessed;
    }

    const leftModified = Date.parse(left.modifiedAt || 0);
    const rightModified = Date.parse(right.modifiedAt || 0);

    if (leftModified !== rightModified) {
      return rightModified - leftModified;
    }

    return left.path.localeCompare(right.path);
  });

  return ranked[0] || null;
}
