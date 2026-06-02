import { describe, expect, it } from "vitest";
import {
  renderCostTiers,
  renderDocs,
  renderDriftOverview,
  renderDriftRegister,
  renderRemediationPosture,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderDriftOverview()).toContain("Identity Cost Drift Brief");
  });

  it("renders the drift register route", () => {
    expect(renderDriftRegister()).toContain("/drift-register");
  });

  it("renders the cost tiers route", () => {
    expect(renderCostTiers()).toContain("/cost-tiers");
  });

  it("renders the remediation posture route", () => {
    expect(renderRemediationPosture()).toContain("/remediation-posture");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic identity-cost data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
