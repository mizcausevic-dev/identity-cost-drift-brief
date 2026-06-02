import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("identity-cost-drift-brief app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Identity Cost Drift Brief");
  });

  it("serves the drift register route", async () => {
    const response = await request(app).get("/drift-register");
    expect(response.status).toBe(200);
  });

  it("serves the cost tiers route", async () => {
    const response = await request(app).get("/cost-tiers");
    expect(response.status).toBe(200);
  });

  it("serves the remediation posture route", async () => {
    const response = await request(app).get("/remediation-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.systemsTracked).toBeGreaterThan(0);
  });

  it("serves the drift register API", async () => {
    const response = await request(app).get("/api/drift-register");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("serves the cost tiers API", async () => {
    const response = await request(app).get("/api/cost-tiers");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
