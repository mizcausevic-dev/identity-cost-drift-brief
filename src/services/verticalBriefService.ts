import { analyze } from "../analyze.js";
import { sampleIdentityCostDriftBrief } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleIdentityCostDriftBrief, { now: "2026-06-02T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Reclaim Microsoft overlap, collapse privileged-control duplication, standardize vendor access windows, expire elevated FinTech roles faster, contain nonprofit guest sprawl, and narrow robotics operator scope before the next board cycle."
  };
}

export function driftRegister() {
  return sampleIdentityCostDriftBrief.map((item) => ({
    lane: item.lane,
    operatingCluster: item.operatingCluster,
    driftTier: item.driftTier,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    driftNarrative: item.driftNarrative,
    driftScore: item.driftScore,
    nextMove: item.nextMove
  }));
}

export function costTiers() {
  return sampleIdentityCostDriftBrief.map((item) => ({
    lane: item.lane,
    driftTier: item.driftTier,
    dimension: item.dimension,
    riskHeadline: item.riskHeadline,
    driftSignal: item.driftSignal,
    blockingIssue: item.blockingIssue,
    evidenceArtifacts: item.evidenceArtifacts,
    driftScore: item.driftScore,
    licenseWasteScore: item.licenseWasteScore,
    accessReviewBurdenScore: item.accessReviewBurdenScore,
    duplicationScore: item.duplicationScore,
    controlGapScore: item.controlGapScore
  }));
}

export function remediationPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeRecoveryScore: item.compositeRecoveryScore,
    owner: item.owner,
    recoverableCostMillions: item.recoverableCostMillions,
    nextMove: item.nextMove
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    dimension: item.dimension,
    compositeRecoveryScore: item.compositeRecoveryScore,
    recoverableCostMillions: item.recoverableCostMillions,
    driftScore: item.driftScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic identity-cost data only - no live IAM exports, billing records, access-review logs, or board materials are included.",
    "Scores are modeled to show how Kinetic Gain can expose license overlap, guest sprawl, role bloat, review drift, and control duplication in one board-readable surface.",
    "All routes are read-only and demonstrate executive identity-cost diagnosis, not production IAM advice, legal guidance, or live access administration instructions."
  ];
}

export function payload() {
  return {
    report,
    driftRegister: driftRegister(),
    costTiers: costTiers(),
    remediationPosture: remediationPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleIdentityCostDriftBrief
  };
}
