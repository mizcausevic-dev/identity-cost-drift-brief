# Architecture

Identity Cost Drift Brief is a static-friendly TypeScript executive-intelligence surface for exposing access-spend drift, license overlap, guest sprawl, duplicated controls, and recoverable cost across the broader Kinetic Gain suite.

## Routes

- `/`
- `/drift-register`
- `/cost-tiers`
- `/remediation-posture`
- `/verification`
- `/docs`

## Flow

1. `src/data/sampleVerticalBrief.ts` defines synthetic identity-governance lanes with drift tiers, blocking issues, and recoverable-cost signals.
2. `src/analyze.ts` converts those signals into board-readable identity-cost assessments and a composite recovery score.
3. `src/services/verticalBriefService.ts` shapes the drift register, cost tiers, remediation posture, and JSON payload routes.
4. `src/services/render.ts` turns those outputs into the static HTML views used in the published surface.

## Output contract

The surface publishes:

- board-readable HTML routes for overview, drift register, cost tiers, remediation posture, verification, and docs
- JSON routes for summary, drift register, cost tiers, remediation posture, verification, and full payload export
- generated screenshots and fixtures for README packaging and safe product proof
