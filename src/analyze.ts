import type {
  IdentityCostAssessment,
  IdentityCostDriftBriefExport,
  IdentityCostDriftBriefItem,
  IdentityCostDriftBriefReportItem,
  IdentityCostSeverity
} from "./types.js";

function assessHigh(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): IdentityCostAssessment {
  let severity: IdentityCostSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: IdentityCostDriftBriefItem[],
  options: { now?: string } = {}
): IdentityCostDriftBriefExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: IdentityCostDriftBriefReportItem[] = items.map((item) => {
    const driftAssessment = assessHigh(
      item.driftScore,
      60,
      74,
      "Identity-cost drift is contained enough in this lane.",
      "Identity-cost drift is visible and should be tightened before the next board cycle.",
      "Identity-cost drift is high enough to distort the cost, control, and cleanup story."
    );

    const licenseWasteAssessment = assessHigh(
      item.licenseWasteScore,
      54,
      70,
      "License waste is controlled enough in this lane.",
      "License waste is rising and should be reclaimed faster.",
      "License waste is high enough to make the spend story look undisciplined."
    );

    const reviewBurdenAssessment = assessHigh(
      item.accessReviewBurdenScore,
      50,
      66,
      "Access-review burden is manageable in this lane.",
      "Access-review burden is rising and should be simplified.",
      "Access-review burden is high enough to erode operating leverage."
    );

    const duplicationAssessment = assessHigh(
      item.duplicationScore,
      46,
      64,
      "Control duplication is limited enough in this lane.",
      "Control duplication is visible and should be collapsed.",
      "Control duplication is high enough to weaken the cost and trust story together."
    );

    const controlAssessment = assessHigh(
      item.controlGapScore,
      48,
      66,
      "Control coverage is strong enough to support the current identity-cost story.",
      "Control gaps are visible and should be tightened.",
      "Control gaps are materially weakening the identity-governance and diligence posture."
    );

    const compositeRecoveryScore =
      Math.round(
        ((item.driftScore +
          item.licenseWasteScore +
          item.accessReviewBurdenScore +
          item.duplicationScore +
          item.controlGapScore) /
          5) *
          10
      ) / 10;

    return {
      ...item,
      driftAssessment,
      licenseWasteAssessment,
      reviewBurdenAssessment,
      duplicationAssessment,
      controlAssessment,
      compositeRecoveryScore
    };
  });

  const highDriftLanes = reportItems.filter((item) => item.driftAssessment.severity !== "LOW").length;
  const resetRequiredLanes = reportItems.filter(
    (item) => item.controlAssessment.severity === "HIGH" || item.duplicationAssessment.severity === "HIGH"
  ).length;
  const severeWasteHotspots = reportItems.filter(
    (item) => item.licenseWasteAssessment.severity === "HIGH" || item.reviewBurdenAssessment.severity === "HIGH"
  ).length;
  const averageDriftScore =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.driftScore, 0) / reportItems.length) * 10) / 10;
  const recoverableCostMillions = reportItems.reduce((sum, item) => sum + item.recoverableCostMillions, 0);

  const leadingMessage =
    resetRequiredLanes >= 2
      ? "Identity governance is real, but too many lanes still lose money and trust to duplicated controls, sticky entitlements, and weak cleanup discipline."
      : severeWasteHotspots >= 3
        ? "The identity stack is directionally strong, though waste and review burden are still too high across too many lanes."
        : "The identity-cost posture is mostly contained, though a few lanes still need faster reclamation, narrower roles, and tighter control coverage.";

  return {
    generatedAt,
    summary: {
      systemsTracked: reportItems.length,
      highDriftLanes,
      resetRequiredLanes,
      severeWasteHotspots,
      averageDriftScore,
      recoverableCostMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: IdentityCostDriftBriefItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
