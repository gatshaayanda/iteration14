import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ignoredDirs = new Set([".git","node_modules",".next","coverage"]);
const ignoredFiles = new Set(["AGENTS.md","scripts/verify-identity.mjs"]);
const textExtensions = new Set([".ts",".tsx",".js",".mjs",".css",".json",".webmanifest",".md",".yml",".yaml",".txt",".html",".svg"]);
const failures = [];
const page = fs.readFileSync(path.join(root, "src/app/page.tsx"), "utf8");
if (!page.includes("PersonalChannelOS")) failures.push("the application entry point must load the personal channel experience");
const personalOS = fs.readFileSync(path.join(root, "src/app/PersonalChannelOS.tsx"), "utf8");
if (!personalOS.includes('type="text" value={invite}') || !personalOS.includes("Invite someone") || !personalOS.includes('placeholder="Enter a name"') || personalOS.includes('type="email" value={invite}') || personalOS.includes("invited emails")) failures.push("BACKPACK demo invitations must use a plain text name field, not email");
if (!personalOS.includes("Member names") || !personalOS.includes("filter(Boolean)") || !personalOS.includes("personKey(member)")) failures.push("VIP circle membership must accept simple names");
if (!personalOS.includes("personKey(signedPerson.name)") || !personalOS.includes("personKey(item)===key") || !personalOS.includes("personKey(member)===key")) failures.push("restricted demo access must match invited and VIP member names case-insensitively");

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full)); else files.push(full);
  }
  return files;
}
for (const file of walk(root)) {
  const rel = path.relative(root, file).replaceAll(path.sep, "/");
  if (ignoredFiles.has(rel) || !textExtensions.has(path.extname(file).toLowerCase())) continue;
  const content = fs.readFileSync(file, "utf8");
  if (/boemo-joos-food-deals|namane-tyres\.vercel\.app|yusuf-clothing-line\.vercel\.app/i.test(content)) failures.push(rel + ": inherited project URL remains");
}
const manifest = JSON.parse(fs.readFileSync(path.join(root, "public/manifest.webmanifest"), "utf8"));
if (manifest.name !== "BACKPACK OS") failures.push("manifest: wrong application name");
if (manifest.short_name !== "BACKPACK") failures.push("manifest: wrong short name");
if (manifest.theme_color !== "#155eef") failures.push("manifest: wrong theme color");
if (!manifest.icons?.some(icon => icon.src === "/backpack-os-icon-v3.svg" && icon.sizes === "any")) failures.push("manifest: BACKPACK SVG icon missing");
if (!manifest.icons?.some(icon => icon.src === "/backpack-os-icon-v3.svg" && icon.sizes === "any")) failures.push("manifest: Android 192px BACKPACK SVG missing");
for (const iconPath of ["/backpack-os-icon-v3.svg"]) {
  if (!manifest.icons?.some(icon => icon.src === iconPath)) failures.push("manifest: icon missing " + iconPath);
  if (!fs.existsSync(path.join(root, "public", iconPath.slice(1)))) failures.push("manifest icon asset missing " + iconPath);
}
const appManifest = fs.readFileSync(path.join(root, "src/app/manifest.ts"), "utf8");
if (!appManifest.includes('name: "BACKPACK OS"')) failures.push("app manifest: wrong application name");
if (appManifest.includes("The Plug") || appManifest.includes("plug-icon")) failures.push("app manifest: inherited The Plug identity remains");
if (!appManifest.includes("/backpack-os-icon-v3.svg")) failures.push("app manifest: BACKPACK SVG icon missing");
if (!fs.existsSync(path.join(root, "public/backpack-os-icon-v3.svg"))) failures.push("Backpack OS SVG icon file missing");
const layout = fs.readFileSync(path.join(root, "src/app/layout.tsx"), "utf8");
if (!layout.includes('apple:{url:"/backpack-os-icon-v3.svg"')) failures.push("Apple install metadata must use the BACKPACK SVG icon");
if (!layout.includes('url:"/backpack-os-icon-v3.svg"')) failures.push("browser/Android icon metadata must use the BACKPACK SVG");

if (!fs.existsSync(path.join(root, "public/backpack-os-icon-v3.svg"))) failures.push("BACKPACK Android install icon file missing");
const pwaRegister = fs.readFileSync(path.join(root, "src/app/pwa-register.tsx"), "utf8");
for (const expected of ["BACKPACK OS | Your Personal Channel", "applicationName:\"BACKPACK OS\""]) if (!layout.includes(expected)) failures.push("layout: missing " + expected);
// Validate Apple install metadata semantically; whitespace and additional metadata fields are harmless.
if (!/appleWebApp\s*:\s*\{[^}]*\bcapable\s*:\s*true\b[^}]*\btitle\s*:\s*["']BACKPACK OS["']/s.test(layout)) failures.push('layout: missing appleWebApp capable=true and title="BACKPACK OS"');
const iconSvg = fs.readFileSync(path.join(root, "public/backpack-os-icon-v3.svg"), "utf8");
if (!iconSvg.includes("<svg") || !iconSvg.includes("shoulder straps") && !iconSvg.includes("fbbf24")) failures.push("BACKPACK icon: expected the dedicated backpack SVG artwork");
const sw = fs.readFileSync(path.join(root, "public/sw.js"), "utf8");
if (!/backpack-os-shell-v\d+/.test(sw)) failures.push("service worker: missing isolated cache namespace");
if (!sw.includes("/backpack-os-icon-v3.svg")) failures.push("service worker: BACKPACK SVG icon missing from app shell");
if (/iteration13-icon-(?:180|192|512)\.(?:png|svg)/.test(JSON.stringify(manifest)) || /iteration13-icon-(?:180|192|512)\.(?:png|svg)/.test(appManifest) || /iteration13-icon-(?:180|192|512)\.(?:png|svg)/.test(layout)) failures.push("PWA identity: inherited Iteration 13 icon reference remains");
if (!/backpack-os-shell-v\d+/.test(sw)) failures.push("service worker: BACKPACK cache namespace is not isolated");
if (!sw.includes("/iphone-install") || !sw.includes("/iphone-install.svg")) failures.push("service worker: iPhone installation guide is not cached for offline use");

if (!pwaRegister.includes("await deferredPrompt.prompt()") || !pwaRegister.includes("setInstallable(true)")) failures.push("PWA install: native prompt is not connected to the branded install action");
if (!pwaRegister.includes("installable && !installCardDismissed")) failures.push("PWA install: card must appear when the browser provides its native install event");
if (/Install Iteration 13 from your browser|Chrome or Edge, open the <b>browser menu|platform-specific fallback as Odi/i.test(pwaRegister)) failures.push("PWA install: generic desktop/Android explainer fallback must not replace the native browser prompt");

// Guard the actual installation lifecycle, not just its visible copy. These checks
// intentionally fail the production build if a future edit breaks the approved flow.
const installContracts = [
  [pwaRegister.includes('window.addEventListener("beforeinstallprompt", installPrompt)') && pwaRegister.includes("event.preventDefault()"), "Africhiko baseline beforeinstallprompt listener is missing"],
  [pwaRegister.includes("setDeferredPrompt(event as InstallPromptEvent)") && pwaRegister.includes("await deferredPrompt.prompt()") && pwaRegister.includes("await deferredPrompt.userChoice"), "native install event must be retained and invoked directly from the install button"],
  [pwaRegister.includes('className="i13-install-card"') && pwaRegister.includes('className="i13-install-close"') && pwaRegister.includes("setInstallCardDismissed(true)"), "BACKPACK branded dismissible install card is missing"],
  [pwaRegister.includes('navigator.serviceWorker.register("/sw.js")'), "Africhiko baseline service-worker registration is missing"],
];
for (const [passed, message] of installContracts) if (!passed) failures.push("PWA install contract: " + message);

const installGuidePath = path.join(root, "src/app/iphone-install/page.tsx");
if (!fs.existsSync(installGuidePath)) failures.push("iPhone installation guide route missing");
else if (!fs.readFileSync(installGuidePath, "utf8").includes("https://youtu.be/et2_1AcBYlg")) failures.push("iPhone installation guide: walkthrough link missing");
if (!fs.existsSync(path.join(root, "public/iphone-install.svg"))) failures.push("iPhone installation illustration missing");
// Protect the install journey across the entire UI, not only pwa-register.tsx.
// Branding/visual changes must never reintroduce a fake or dead-end desktop install screen.
function walkUiSource(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkUiSource(full));
    else if (/\.(?:tsx|ts|jsx|js)$/.test(entry.name)) files.push(full);
  }
  return files;
}
const forbiddenInstallCopy = /If your browser provides a native install prompt|Chrome install option|If neither option appears, Chrome has not marked this site installable|In Chrome, open the .*menu and choose Install app or Add to Home screen|open the Chrome menu and choose Install app|Continue on the website.{0,80}(?:Chrome|browser menu)|No app-store search needed.{0,100}browser will guide the installation|your browser will guide the installation/i;
for (const file of walkUiSource(path.join(root, "src"))) {
  if (forbiddenInstallCopy.test(fs.readFileSync(file, "utf8"))) {
    failures.push(path.relative(root, file).replaceAll(path.sep, "/") + ": forbidden generic desktop/Android install fallback copy returned");
  }
}


const personalOs = fs.readFileSync(path.join(root, "src/app/PersonalChannelOS.tsx"), "utf8");
const personalCss = fs.readFileSync(path.join(root, "src/app/personal-channel-os.css"), "utf8");
if (!personalOs.includes('className="bp-bottom-dock"') || !personalOs.includes('aria-label="Backpack workspace selector"') || !personalOs.includes('aria-label="Open Business Operating System"')) failures.push("workspace navigation: Backpack and B.O.S. must remain in the bottom dock");
if (personalOs.includes('className="bp-backpack-link"') || /iteration13\.vercel\.app\/" target="_blank"/.test(personalOs)) failures.push("workspace navigation: top-nav switchers or forced new-tab B.O.S. links returned");
if (!personalCss.includes(".bp-bottom-dock{position:fixed") || !personalCss.includes("env(safe-area-inset-bottom)")) failures.push("workspace navigation: fixed bottom dock must respect the device safe area");
if (!personalOs.includes('setScreen("chooser")') || !personalOs.includes('Create new Backpack OS') || !personalOs.includes('OR LOAD AN EXISTING BACKPACK')) failures.push("workspace launcher: create-or-load choice must appear on app launch");
if (!personalOs.includes('Load Backpack ↗') || !personalOs.includes('INDEX_KEY') || !personalOs.includes('backpackName')) failures.push("workspace launcher: named existing Backpacks must be saved and loadable");
if (!personalOs.includes('backpack-legacy') || !personalOs.includes('backpack-os:workspaces:v1')) failures.push("workspace launcher: legacy single-Backpack data must migrate without loss");


if (failures.length) {
  console.error("IDENTITY VERIFICATION FAILED");
  failures.forEach(failure => console.error(" - " + failure));
  process.exit(1);
}
console.log("IDENTITY VERIFIED — BACKPACK OS metadata and service-worker cache are isolated.");
