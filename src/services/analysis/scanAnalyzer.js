import {
  chooseDuplicateKeepCandidate,
  evaluateRisk,
  groupByCategory,
  summarizeRiskCounts
} from "./riskEngine.js";

function formatBytes(value) {
  if (value < 1024) {
    return `${value} B`;
  }

  const units = ["KB", "MB", "GB", "TB"];
  let size = value;
  let unitIndex = -1;

  do {
    size /= 1024;
    unitIndex += 1;
  } while (size >= 1024 && unitIndex < units.length - 1);

  return `${size.toFixed(size >= 10 ? 1 : 2)} ${units[unitIndex]}`;
}

function pickPrimaryCategory(file) {
  return file.categories[0] || "unknown";
}

function buildLocalSummary(candidates, groupedCategories, reclaimableBytes, duplicateGroups, directoryHotspots) {
  if (candidates.length === 0) {
    return "No clear cleanup candidates were detected in the scanned targets.";
  }

  const topCategory = groupedCategories[0];
  const segments = [
    `Detected ${candidates.length} cleanup candidates with an estimated reclaimable space of ${formatBytes(reclaimableBytes)}.`,
    `The heaviest category is ${topCategory.category}, with ${topCategory.count} files totaling ${formatBytes(topCategory.totalBytes)}.`
  ];

  if (duplicateGroups.length > 0) {
    const topDuplicateGroup = duplicateGroups[0];
    segments.push(
      `Found ${duplicateGroups.length} duplicate file groups. The largest duplicate cluster wastes about ${formatBytes(topDuplicateGroup.wastedBytes)}.`
    );
  }

  if (directoryHotspots.length > 0) {
    const topHotspot = directoryHotspots[0];
    segments.push(
      `The largest hotspot directory is ${topHotspot.path}, currently using ${formatBytes(topHotspot.totalBytes)}.`
    );
  }

  return segments.join(" ");
}

function buildDuplicateRecommendations(duplicateGroups) {
  return duplicateGroups.slice(0, 10).map((group) => ({
    key: group.key,
    representativeName: group.representativeName,
    fileCount: group.fileCount,
    sizeBytes: group.sizeBytes,
    wastedBytes: group.wastedBytes,
    files: group.files
  }));
}

function buildDuplicateResolutionRecommendations(duplicateGroups, candidateFilesById) {
  return duplicateGroups.slice(0, 10).map((group) => {
    const enrichedFiles = group.files
      .map((item) => candidateFilesById.get(item.id))
      .filter(Boolean);

    const keepCandidate = chooseDuplicateKeepCandidate(enrichedFiles);
    const cleanupCandidates = enrichedFiles.filter((item) => item.id !== keepCandidate?.id);

    return {
      key: group.key,
      representativeName: group.representativeName,
      fileCount: group.fileCount,
      sizeBytes: group.sizeBytes,
      wastedBytes: group.wastedBytes,
      keep: keepCandidate
        ? {
            id: keepCandidate.id,
            path: keepCandidate.path,
            accessedAt: keepCandidate.accessedAt,
            modifiedAt: keepCandidate.modifiedAt,
            reason: "Chosen because it is the safest or most recently used copy."
          }
        : null,
      cleanupCandidates: cleanupCandidates.map((item) => ({
        id: item.id,
        path: item.path,
        risk: item.risk,
        recommendedAction: item.risk.recommendedAction
      }))
    };
  });
}

function buildPriorityItems(candidates, duplicateResolutionRecommendations, directoryHotspots) {
  const priorities = [];

  if (duplicateResolutionRecommendations.length > 0) {
    const topDuplicate = duplicateResolutionRecommendations[0];
    priorities.push({
      type: "duplicate-resolution",
      title: `Review duplicate group for ${topDuplicate.representativeName}`,
      description: `This group has ${topDuplicate.fileCount} copies and wastes space that can likely be reclaimed safely after confirming the preferred copy.`,
      impactedBytes: topDuplicate.wastedBytes
    });
  }

  if (directoryHotspots.length > 0) {
    const hotspot = directoryHotspots[0];
    priorities.push({
      type: "directory-hotspot",
      title: `Inspect hotspot directory ${hotspot.path}`,
      description: `This directory currently consumes the most space among scanned locations and contains ${hotspot.candidateCount} cleanup candidates.`,
      impactedBytes: hotspot.totalBytes
    });
  }

  if (candidates.length > 0) {
    const topCandidate = candidates[0];
    priorities.push({
      type: "largest-candidate",
      title: `Review large candidate ${topCandidate.name}`,
      description: `This file is one of the largest cleanup candidates and may provide quick space recovery if it is no longer needed.`,
      impactedBytes: topCandidate.sizeBytes
    });
  }

  return priorities;
}

function buildDirectoryHotspotRecommendations(directoryHotspots, candidates) {
  const groupedCandidates = new Map();

  for (const item of candidates) {
    const list = groupedCandidates.get(item.directory) || [];
    list.push(item);
    groupedCandidates.set(item.directory, list);
  }

  return directoryHotspots.slice(0, 10).map((hotspot) => {
    const cleanupCandidates = candidates
      .filter((item) => item.path.startsWith(hotspot.path))
      .sort((left, right) => right.sizeBytes - left.sizeBytes)
      .slice(0, 10)
      .map((item) => ({
        id: item.id,
        path: item.path,
        name: item.name,
        sizeBytes: item.sizeBytes,
        risk: item.risk,
        category: item.primaryCategory,
        recommendedAction: item.risk.recommendedAction
      }));

    return {
      path: hotspot.path,
      totalBytes: hotspot.totalBytes,
      fileCount: hotspot.fileCount,
      candidateCount: hotspot.candidateCount,
      cleanupCandidates
    };
  }).filter((item) => item.cleanupCandidates.length > 0);
}

export class ScanAnalyzer {
  analyze(scanResult) {
    const candidates = scanResult.files
      .filter((file) => file.categories.length > 0)
      .map((file) => {
        const risk = evaluateRisk(file);
        return {
          ...file,
          primaryCategory: pickPrimaryCategory(file),
          risk
        };
      })
      .sort((left, right) => right.sizeBytes - left.sizeBytes);

    const groupedCategories = groupByCategory(candidates);
    const reclaimableBytes = candidates
      .filter((item) => item.risk.deletionAllowed)
      .reduce((sum, item) => sum + item.sizeBytes, 0);
    const duplicateGroups = scanResult?.insights?.duplicateGroups || [];
    const directoryHotspots = scanResult?.insights?.directoryHotspots || [];
    const candidateFilesById = new Map(candidates.map((item) => [item.id, item]));
    const duplicateResolutionRecommendations = buildDuplicateResolutionRecommendations(
      duplicateGroups,
      candidateFilesById
    );
    const directoryHotspotRecommendations = buildDirectoryHotspotRecommendations(
      directoryHotspots,
      candidates
    );

    const recommendedItems = candidates.slice(0, 20).map((item) => ({
      id: item.id,
      path: item.path,
      name: item.name,
      category: item.primaryCategory,
      sizeBytes: item.sizeBytes,
      modifiedAt: item.modifiedAt,
      accessedAt: item.accessedAt,
      risk: item.risk,
      reasons: [...item.reasons, ...item.risk.reasons]
    }));

    return {
      generatedAt: new Date().toISOString(),
      scanSummary: scanResult.summary,
      candidateSummary: {
        totalCandidates: candidates.length,
        reclaimableBytes,
        riskCounts: summarizeRiskCounts(candidates),
        groupedCategories,
        duplicateGroups: buildDuplicateRecommendations(duplicateGroups),
        duplicateResolutionRecommendations,
        directoryHotspots,
        directoryHotspotRecommendations
      },
      summaryText: buildLocalSummary(
        candidates,
        groupedCategories,
        reclaimableBytes,
        duplicateGroups,
        directoryHotspots
      ),
      priorities: buildPriorityItems(candidates, duplicateResolutionRecommendations, directoryHotspots),
      recommendedItems
    };
  }
}
