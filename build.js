import fs from "node:fs";
import path from "node:path";

const SOURCE_FILES = ["index.html", "style.css", "tasks.js", "script.js"];
const OUTPUT_DIR = "dist";
const VERSION_PLACEHOLDER = "{{VERSION}}";

function fail(message) {
  console.error("BUILD FAILED ✗");
  console.error(`  ${message}`);
  process.exit(1);
}

function getPackageVersion(pkgPath = "./package.json") {
  try {
    const raw = fs.readFileSync(pkgPath, "utf8");
    const { version } = JSON.parse(raw);
    if (!version) fail("Champ 'version' absent dans package.json");
    return version;
  } catch (err) {
    fail(`Impossible de lire package.json : ${err.message}`);
  }
}

function verifyInputs(files) {
  for (const file of files) {
    if (!fs.existsSync(file)) {
      fail(`Fichier introuvable : ${file}`);
    }
  }

  const html = fs.readFileSync("index.html", "utf8");
  if (!html.includes(VERSION_PLACEHOLDER)) {
    fail(`Marqueur ${VERSION_PLACEHOLDER} introuvable dans index.html`);
  }

  return html;
}

function prepareOutputDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function copySourceFiles(files, outputDir) {
  for (const file of files) {
    fs.copyFileSync(file, path.join(outputDir, file));
    console.log(`  copié : ${file}`);
  }
}

function injectVersion(outputDir, html, version) {
  const targetPath = path.join(outputDir, "index.html");
  const updatedHtml = html.replaceAll(VERSION_PLACEHOLDER, version);
  fs.writeFileSync(targetPath, updatedHtml, "utf8");
  console.log(`  version inscrite : ${version}`);
}

function build() {
  const version = getPackageVersion();
  console.log(`Build de Task Manager Web v${version}`);

  const html = verifyInputs(SOURCE_FILES);
  console.log("  vérifications : OK");

  prepareOutputDir(OUTPUT_DIR);
  copySourceFiles(SOURCE_FILES, OUTPUT_DIR);
  injectVersion(OUTPUT_DIR, html, version);

  console.log(`BUILD SUCCESS ✓  ->  dossier ${OUTPUT_DIR}/`);
}

build();
