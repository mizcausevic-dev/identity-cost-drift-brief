import { describe, expect, it } from "vitest";
import { costTiers, driftRegister, payload, remediationPosture, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the drift summary", () => {
    expect(summary().systemsTracked).toBeGreaterThan(0);
  });

  it("returns the drift register view", () => {
    expect(driftRegister().length).toBeGreaterThan(0);
  });

  it("returns the cost tiers view", () => {
    expect(costTiers().length).toBeGreaterThan(0);
  });

  it("returns the remediation posture view", () => {
    expect(remediationPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.systemsTracked).toBeGreaterThan(0);
  });
});
