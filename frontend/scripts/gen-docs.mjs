import { readFileSync, writeFileSync } from "node:fs";
const root = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const ids = (file) => [...read(file).matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1]);
const table = (title, file) => `### ${title}\n\n| id |\n|---|\n${ids(file).map((i) => `| \`${i}\` |`).join("\n")}\n`;
const generated = ["<!-- GENERATED:registry start -->", table("Agent presets", "src/registry/agentPresets.ts"), table("Data lake presets", "src/registry/dataLakePresets.ts"), table("Output schemas", "src/registry/schemas.ts"), table("MCP attachments (declared, not executable)", "src/registry/mcpAttachments.ts"), table("Service features", "src/registry/services.manifest.ts"), "<!-- GENERATED:registry end -->"].join("\n");
const path = new URL("EXTENDING.md", root);
const cur = readFileSync(path, "utf8");
const next = cur.includes("<!-- GENERATED:registry start -->") ? cur.replace(/<!-- GENERATED:registry start -->[\s\S]*<!-- GENERATED:registry end -->/, generated) : `${cur.trim()}\n\n${generated}\n`;
const norm = (s) => s.replace(/\r\n/g, "\n");
if (process.argv.includes("--check")) { if (norm(cur) !== norm(next)) { console.error("EXTENDING.md registry tables are stale; run npm run docs:gen"); process.exit(1); } console.log("docs:check ok"); }
else { writeFileSync(path, next); console.log("EXTENDING.md regenerated"); }
