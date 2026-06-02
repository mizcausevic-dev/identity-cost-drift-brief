import type { IdentityCostDriftBriefSummary } from "./types.js";

export function formatSummary(
  summary: IdentityCostDriftBriefSummary,
  title = "Identity Cost Drift Brief"
) {
  return [
    title,
    `Systems tracked: ${summary.systemsTracked}`,
    `High-drift lanes: ${summary.highDriftLanes}`,
    `Reset-required lanes: ${summary.resetRequiredLanes}`,
    `Severe waste hotspots: ${summary.severeWasteHotspots}`,
    `Average drift score: ${summary.averageDriftScore}`,
    `Recoverable cost: $${summary.recoverableCostMillions}M`,
    summary.leadingMessage
  ].join("\n");
}
