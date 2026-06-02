import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("formats the drift summary", () => {
    const output = formatSummary({
      systemsTracked: 6,
      highDriftLanes: 4,
      resetRequiredLanes: 2,
      severeWasteHotspots: 3,
      averageDriftScore: 72,
      recoverableCostMillions: 40,
      leadingMessage: "The identity-cost posture is directionally sound."
    });

    expect(output).toContain("Identity Cost Drift Brief");
    expect(output).toContain("High-drift lanes: 4");
    expect(output).toContain("Recoverable cost: $40M");
  });
});
