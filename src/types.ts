export type IdentityCostDimension =
  | "LICENSE_OVERLAP"
  | "UNUSED_ENTITLEMENT"
  | "ROLE_BLOAT"
  | "GUEST_SPRAWL"
  | "TOOL_DUPLICATION"
  | "REVIEW_DRIFT";

export type IdentityCostAction = "RECLAIM" | "CONSOLIDATE" | "STANDARDIZE" | "CONTAIN" | "ESCALATE";

export type IdentityCostSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface IdentityCostDriftBriefItem {
  id: string;
  lane: string;
  dimension: IdentityCostDimension;
  action: IdentityCostAction;
  operatingCluster: string;
  driftTier: "CONTROLLED" | "PRESSURED" | "CONSTRAINED" | "BROKEN";
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  driftNarrative: string;
  operatingReality: string;
  riskHeadline: string;
  driftSignal: string;
  blockingIssue: string;
  evidenceArtifacts: string[];
  opportunityMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  driftScore: number;
  licenseWasteScore: number;
  accessReviewBurdenScore: number;
  duplicationScore: number;
  controlGapScore: number;
  recoverableCostMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface IdentityCostAssessment {
  severity: IdentityCostSeverity;
  ok: boolean;
  message: string;
}

export interface IdentityCostDriftBriefReportItem extends IdentityCostDriftBriefItem {
  driftAssessment: IdentityCostAssessment;
  licenseWasteAssessment: IdentityCostAssessment;
  reviewBurdenAssessment: IdentityCostAssessment;
  duplicationAssessment: IdentityCostAssessment;
  controlAssessment: IdentityCostAssessment;
  compositeRecoveryScore: number;
}

export interface IdentityCostDriftBriefSummary {
  systemsTracked: number;
  highDriftLanes: number;
  resetRequiredLanes: number;
  severeWasteHotspots: number;
  averageDriftScore: number;
  recoverableCostMillions: number;
  leadingMessage: string;
}

export interface IdentityCostDriftBriefExport {
  generatedAt: string;
  summary: IdentityCostDriftBriefSummary;
  items: IdentityCostDriftBriefReportItem[];
}

export interface IdentityCostDriftBriefPayload {
  report: IdentityCostDriftBriefExport;
  driftRegister: ReturnType<typeof import("./services/verticalBriefService.js").driftRegister>;
  costTiers: ReturnType<typeof import("./services/verticalBriefService.js").costTiers>;
  remediationPosture: ReturnType<typeof import("./services/verticalBriefService.js").remediationPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: IdentityCostDriftBriefItem[];
}
