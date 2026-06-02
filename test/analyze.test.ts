import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { sampleIdentityCostDriftBrief } from "../src/data/sampleVerticalBrief.js";
import type { IdentityCostDriftBriefItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleIdentityCostDriftBrief, { now: "2026-06-02T00:00:00Z" });
    expect(report.items.length).toBe(sampleIdentityCostDriftBrief.length);
  });

  it("counts high-drift lanes", () => {
    const report = analyze(sampleIdentityCostDriftBrief, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.highDriftLanes).toBeGreaterThan(0);
  });

  it("counts reset-required lanes", () => {
    const report = analyze(sampleIdentityCostDriftBrief, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.resetRequiredLanes).toBeGreaterThan(0);
  });

  it("sums recoverable cost", () => {
    const report = analyze(sampleIdentityCostDriftBrief, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.recoverableCostMillions).toBe(40);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleIdentityCostDriftBrief, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.systemsTracked).toBe(0);
    expect(report.summary.averageDriftScore).toBe(0);
    expect(report.summary.leadingMessage).toContain("mostly contained");
  });

  it("hits low and medium branches explicitly", () => {
    const fixtures: IdentityCostDriftBriefItem[] = [
      {
        id: "low-branch",
        lane: "Stable lane",
        dimension: "LICENSE_OVERLAP",
        action: "RECLAIM",
        operatingCluster: "AI governance",
        driftTier: "CONTROLLED",
        boardQuestion: "Is this lane stable enough to keep moving?",
        owner: "Chief AI Officer",
        audience: "Board technology committee",
        currentPosture: "Controlled.",
        driftNarrative: "This lane is controlled.",
        operatingReality: "Healthy.",
        riskHeadline: "Low drift risk.",
        driftSignal: "Minimal drift.",
        blockingIssue: "None",
        evidenceArtifacts: ["memo"],
        opportunityMoves: ["leave it alone"],
        relatedSurfaces: ["scorecard.kineticgain.com"],
        companyTags: ["Google"],
        driftScore: 50,
        licenseWasteScore: 48,
        accessReviewBurdenScore: 30,
        duplicationScore: 45,
        controlGapScore: 32,
        recoverableCostMillions: 4,
        headline: "Stable lane.",
        narrative: "Low branch test.",
        nextMove: "Keep the lane stable."
      },
      {
        id: "medium-branch",
        lane: "Pressured lane",
        dimension: "REVIEW_DRIFT",
        action: "STANDARDIZE",
        operatingCluster: "FinTech",
        driftTier: "PRESSURED",
        boardQuestion: "Where is the drift visible but not yet broken?",
        owner: "Revenue owner",
        audience: "Finance committee",
        currentPosture: "Watch state.",
        driftNarrative: "The lane is pressured.",
        operatingReality: "Some fragmentation.",
        riskHeadline: "Moderate drift risk.",
        driftSignal: "A few reclaim mismatches.",
        blockingIssue: "Workflow duplication",
        evidenceArtifacts: ["control audit"],
        opportunityMoves: ["collapse duplicate reporting"],
        relatedSurfaces: ["merchant.kineticgain.com"],
        companyTags: ["Tableau"],
        driftScore: 70,
        licenseWasteScore: 68,
        accessReviewBurdenScore: 55,
        duplicationScore: 63,
        controlGapScore: 54,
        recoverableCostMillions: 7,
        headline: "Pressured lane.",
        narrative: "Medium branch test.",
        nextMove: "Collapse duplicate reporting."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-02T00:00:00Z" });
    expect(report.items[0].driftAssessment.severity).toBe("LOW");
    expect(report.items[0].licenseWasteAssessment.severity).toBe("LOW");
    expect(report.items[1].driftAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].licenseWasteAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].reviewBurdenAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].duplicationAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].controlAssessment.severity).toBe("MEDIUM");
    expect(report.summary.leadingMessage).toContain("mostly contained");
  });

  it("exports through toExport", () => {
    const report = toExport(sampleIdentityCostDriftBrief, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.systemsTracked).toBe(sampleIdentityCostDriftBrief.length);
  });
});
