import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sampleIdentityCostDriftBrief } from "../src/data/sampleVerticalBrief.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixturesDir = path.join(root, "fixtures");
mkdirSync(fixturesDir, { recursive: true });

for (const filename of readdirSync(fixturesDir)) {
  if (filename.endsWith(".json")) {
    rmSync(path.join(fixturesDir, filename), { force: true });
  }
}

writeFileSync(
  path.join(fixturesDir, "identity-cost-drift-brief.json"),
  JSON.stringify(sampleIdentityCostDriftBrief, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "identity-cost-drift-brief-clean.json"),
  JSON.stringify(
    sampleIdentityCostDriftBrief.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);
