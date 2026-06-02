import express from "express";
import { costTiers, driftRegister, payload, remediationPosture, riskMap, summary, verification } from "./services/verticalBriefService.js";
import {
  renderCostTiers,
  renderDocs,
  renderDriftOverview,
  renderDriftRegister,
  renderRemediationPosture,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderDriftOverview()));
  app.get("/drift-register", (_req, res) => res.type("html").send(renderDriftRegister()));
  app.get("/cost-tiers", (_req, res) => res.type("html").send(renderCostTiers()));
  app.get("/remediation-posture", (_req, res) => res.type("html").send(renderRemediationPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/drift-register", (_req, res) => res.json(driftRegister()));
  app.get("/api/cost-tiers", (_req, res) => res.json(costTiers()));
  app.get("/api/remediation-posture", (_req, res) => res.json(remediationPosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, () => {
    console.log(`identity-cost-drift-brief listening on http://127.0.0.1:${port}`);
  });
}
