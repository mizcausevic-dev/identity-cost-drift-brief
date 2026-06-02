import { costTiers, driftRegister, payload, remediationPosture, riskMap, summary, verification } from "./verticalBriefService.js";

const productTitle = "Identity Cost Drift Brief";
const domain = "https://idcost.kineticgain.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root { color-scheme: dark; --bg:#07111d; --panel:#0d1a2b; --border:rgba(103,224,190,.22); --text:#edf2ff; --muted:#9fb0cf; --accent:#67e0be; --accent-2:#7dc4ff; }
      * { box-sizing:border-box; }
      body { margin:0; font-family:"Segoe UI",system-ui,sans-serif; background:radial-gradient(circle at top left, rgba(125,196,255,.12), transparent 30%), linear-gradient(180deg,#050c16 0%,var(--bg) 100%); color:var(--text); }
      a { color:var(--accent-2); text-decoration:none; }
      .wrap { max-width:1180px; margin:0 auto; padding:32px 24px 64px; }
      .hero,.section { background:linear-gradient(180deg, rgba(14,28,45,.95), rgba(10,19,33,.98)); border:1px solid var(--border); border-radius:28px; padding:28px; box-shadow:0 18px 60px rgba(2,7,16,.35); }
      .hero { margin-bottom:24px; }
      .eyebrow { display:inline-block; padding:10px 16px; border-radius:999px; border:1px solid var(--border); background:rgba(103,224,190,.08); color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.28em; }
      h1,h2 { margin:18px 0 12px; font-family:Georgia,serif; line-height:.95; }
      h1 { font-size:clamp(56px,8vw,92px); max-width:980px; }
      h2 { font-size:clamp(36px,4vw,54px); }
      .lede { color:var(--muted); font-size:20px; line-height:1.6; max-width:920px; }
      .nav { display:flex; gap:10px; flex-wrap:wrap; margin-top:22px; }
      .nav a { padding:10px 14px; border:1px solid rgba(125,196,255,.18); border-radius:999px; color:var(--muted); }
      .nav a.active { color:var(--text); border-color:var(--accent); background:rgba(103,224,190,.08); }
      .metrics,.grid { display:grid; gap:18px; }
      .metrics { grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); margin-top:26px; }
      .metric,.card,.table-wrap { background:rgba(16,32,50,.76); border:1px solid rgba(125,196,255,.12); border-radius:22px; padding:18px; }
      .metric-label,.chip { color:var(--accent); text-transform:uppercase; letter-spacing:.18em; font-size:12px; }
      .metric-value { display:block; font-size:40px; font-weight:700; margin-top:10px; }
      .metric-copy { margin-top:10px; color:var(--muted); line-height:1.5; }
      .section { margin-top:24px; }
      .grid { grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); }
      .card h3 { margin:12px 0 10px; font-size:30px; line-height:1.05; }
      .card p,li { color:var(--muted); line-height:1.6; }
      .table-wrap { overflow-x:auto; }
      table { width:100%; border-collapse:collapse; }
      th,td { text-align:left; padding:12px; border-bottom:1px solid rgba(125,196,255,.12); vertical-align:top; }
      th { color:var(--accent); font-size:12px; text-transform:uppercase; letter-spacing:.18em; }
      ul { padding-left:20px; }
      pre { white-space:pre-wrap; overflow-wrap:anywhere; color:var(--muted); background:rgba(7,17,29,.75); border:1px solid rgba(125,196,255,.12); border-radius:18px; padding:18px; }
      .footer { margin-top:24px; color:var(--muted); font-size:14px; display:flex; gap:18px; flex-wrap:wrap; }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/drift-register", "Drift register"],
    ["/cost-tiers", "Cost tiers"],
    ["/remediation-posture", "Remediation posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => `<a${href === path ? ' class="active"' : ""} href="${href}">${label}</a>`)
    .join("");
}

export function renderDriftOverview() {
  const executiveSummary = summary();
  const lanes = driftRegister().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes.map((item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.operatingCluster)}</h3>
        <p><strong>Tier:</strong> ${escapeHtml(item.driftTier)}</p>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Narrative:</strong> ${escapeHtml(item.driftNarrative)}</p>
        <p><strong>Drift score:</strong> ${item.driftScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`).join("");
  const risks = findings.map((item) => `<li><strong>${escapeHtml(item.lane)}</strong> · recovery ${item.compositeRecoveryScore} · drift ${item.driftScore} · $${item.recoverableCostMillions}M recoverable</li>`).join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Identity economics</span>
      <h1>Where are access sprawl, license overlap, and duplicated control layers quietly distorting the suite’s cost story?</h1>
      <p class="lede">Identity Cost Drift Brief turns entitlement waste, review burden, control duplication, and cleanup failure into one reusable board-facing identity-cost surface.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Systems tracked</span><span class="metric-value">${executiveSummary.systemsTracked}</span><div class="metric-copy">Modeled identity-cost lanes in the current portfolio view.</div></div>
        <div class="metric"><span class="metric-label">High-drift lanes</span><span class="metric-value">${executiveSummary.highDriftLanes}</span><div class="metric-copy">Lanes where access-spend drift is already board-visible.</div></div>
        <div class="metric"><span class="metric-label">Reset-required lanes</span><span class="metric-value">${executiveSummary.resetRequiredLanes}</span><div class="metric-copy">Lanes where duplication or control weakness should be reset before the next board cycle.</div></div>
        <div class="metric"><span class="metric-label">Recoverable cost</span><span class="metric-value">$${executiveSummary.recoverableCostMillions}M</span><div class="metric-copy">Modeled cost recoverable by tightening identity governance and reclamation.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Drift register</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible spend pressure</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready surface for exposing identity-cost drift, license waste, control duplication, and recoverable access spend."
  );
}

export function renderDriftRegister() {
  const rows = driftRegister().map((item) => `<tr><td>${escapeHtml(item.operatingCluster)}</td><td>${escapeHtml(item.driftTier)}</td><td>${escapeHtml(item.owner)}</td><td>${escapeHtml(item.audience)}</td><td>${escapeHtml(item.action)}</td><td>${escapeHtml(item.driftNarrative)}</td><td>${item.driftScore}</td></tr>`).join("");
  return shell("Drift register", "/drift-register", `<section class="hero"><span class="eyebrow">Drift register</span><h1>Each lane keeps one owner, one drift tier, one board audience, and one cleanup move attached.</h1><p class="lede">The drift register keeps the identity-cost story tied to the exact lane where access-spend or control discipline is still weakening execution.</p><div class="nav">${navLinks("/drift-register")}</div></section><section class="section table-wrap"><table><thead><tr><th>Operating cluster</th><th>Tier</th><th>Owner</th><th>Audience</th><th>Action</th><th>Drift narrative</th><th>Score</th></tr></thead><tbody>${rows}</tbody></table></section>`, "Drift-register view showing which lanes deserve identity-cost cleanup before the next board or operator cycle.");
}

export function renderCostTiers() {
  const rows = costTiers().map((item) => `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.driftTier)}</td><td>${escapeHtml(item.dimension)}</td><td>${escapeHtml(item.riskHeadline)}</td><td>${escapeHtml(item.driftSignal)}</td><td>${escapeHtml(item.blockingIssue)}</td><td>${item.driftScore}</td><td>${item.licenseWasteScore}</td><td>${item.accessReviewBurdenScore}</td><td>${item.duplicationScore}</td><td>${item.controlGapScore}</td></tr>`).join("");
  return shell("Cost tiers", "/cost-tiers", `<section class="hero"><span class="eyebrow">Cost tiers</span><h1>The real drift stays visible: is it license waste, guest sprawl, duplicated controls, review burden, or raw governance weakness?</h1><p class="lede">This view keeps each lane tied to the dominant identity-cost weakness so leadership can tighten the right thing first.</p><div class="nav">${navLinks("/cost-tiers")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Tier</th><th>Dimension</th><th>Risk headline</th><th>Drift signal</th><th>Blocking issue</th><th>Drift</th><th>License waste</th><th>Review burden</th><th>Duplication</th><th>Control gap</th></tr></thead><tbody>${rows}</tbody></table></section>`, "Cost-tier view showing which identity-cost failure is strongest in each lane.");
}

export function renderRemediationPosture() {
  const rows = remediationPosture().map((item) => `<tr><td>${escapeHtml(item.lane)}</td><td>${escapeHtml(item.action)}</td><td>${item.compositeRecoveryScore}</td><td>${escapeHtml(item.owner)}</td><td>$${item.recoverableCostMillions}M</td><td>${escapeHtml(item.nextMove)}</td></tr>`).join("");
  return shell("Remediation posture", "/remediation-posture", `<section class="hero"><span class="eyebrow">Remediation posture</span><h1>Cleanup decisions stay tied to one owner, one recoverable cost signal, and one next operating move.</h1><p class="lede">This posture makes it clear where to reclaim, consolidate, standardize, contain, or escalate before the next review cycle.</p><div class="nav">${navLinks("/remediation-posture")}</div></section><section class="section table-wrap"><table><thead><tr><th>Lane</th><th>Action</th><th>Recovery score</th><th>Owner</th><th>Recoverable cost</th><th>Next move</th></tr></thead><tbody>${rows}</tbody></table></section>`, "Remediation-posture view for sequencing identity-cost cleanup and recovery.");
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell("Verification", "/verification", `<section class="hero"><span class="eyebrow">Verification</span><h1>How this identity-cost surface is modeled and what it is safe to infer from it.</h1><p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone treats the sample like live IAM or finance guidance.</p><div class="nav">${navLinks("/verification")}</div></section><section class="section"><ul>${notes}</ul><pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre></section>`, "Verification notes for the Identity Cost Drift Brief sample and modeled outputs.");
}

export function renderDocs() {
  return shell("Docs", "/docs", `<section class="hero"><span class="eyebrow">Docs</span><h1>Identity Cost Drift Brief docs</h1><p class="lede">This surface packages license waste, review burden, guest sprawl, role bloat, and control duplication into reproducible routes and JSON outputs for board and executive operating reviews.</p><div class="nav">${navLinks("/docs")}</div></section><section class="section"><ul><li><code>/drift-register</code> keeps tier stories, owners, and next moves tied to one lane.</li><li><code>/cost-tiers</code> compares drift, waste, review burden, duplication, and control coverage.</li><li><code>/remediation-posture</code> sequences reclaim, consolidate, standardize, contain, and escalate decisions.</li><li><code>/api/payload</code> exposes the reproducible identity-cost packet.</li></ul></section>`, "Product documentation for Identity Cost Drift Brief and its identity-cost routes.");
}
