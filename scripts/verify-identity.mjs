import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

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
if (!personalOS.includes("personKey(p.name)===key") || !personalOS.includes("personKey(item)===key") || !personalOS.includes("personKey(member)===key") || !personalOS.includes('visibility:"vip"') || !personalOS.includes('visibility:"restricted"') || personalOS.includes('type="email"') || personalOS.includes("Your email")) failures.push("BACKPACK audience entry must be name-only and support public, VIP and access-only modes");

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
if (!manifest.icons?.some(icon => icon.src === "/backpack-os-icon-v4-192.png" && icon.sizes === "192x192")) failures.push("manifest: BACKPACK PNG icon missing");
if (!manifest.icons?.some(icon => icon.src === "/backpack-os-icon-v4-192.png" && icon.sizes === "192x192" && icon.type === "image/png")) failures.push("manifest: Android 192px BACKPACK PNG missing");
const rasterIcon = fs.readFileSync(path.join(root, "public/backpack-os-icon-v4-192.png"));
if (createHash("sha256").update(rasterIcon).digest("hex") !== "13a4214548dacfb24ef0bf1d926015d11b095f9c652cca0ce6ec7b8f13c96f0f") failures.push("PWA raster icon: expected approved BACKPACK artwork, not a stale launcher icon");
for (const iconPath of ["/backpack-os-icon-v4-192.png"]) {
  if (!manifest.icons?.some(icon => icon.src === iconPath)) failures.push("manifest: icon missing " + iconPath);
  if (!fs.existsSync(path.join(root, "public", iconPath.slice(1)))) failures.push("manifest icon asset missing " + iconPath);
}
const appManifest = fs.readFileSync(path.join(root, "src/app/manifest.ts"), "utf8");
if (!appManifest.includes('name: "BACKPACK OS"')) failures.push("app manifest: wrong application name");
if (appManifest.includes("The Plug") || appManifest.includes("plug-icon")) failures.push("app manifest: inherited The Plug identity remains");
if (!appManifest.includes("/backpack-os-icon-v4.svg") || !appManifest.includes("/backpack-os-icon-v4-192.png")) failures.push("app manifest: approved BACKPACK SVG and PNG icons must both be declared");
if (!fs.existsSync(path.join(root, "public/backpack-os-icon-v4-192.png"))) failures.push("Backpack OS 192px PNG icon file missing");
const layout = fs.readFileSync(path.join(root, "src/app/layout.tsx"), "utf8");
if (!layout.includes('<link rel="apple-touch-icon" href="/backpack-os-icon-v4-192.png"/>')) failures.push("Apple install metadata must use the current BACKPACK iOS touch icon");
if (!layout.includes('url:"/backpack-os-icon-v4-192.png"')) failures.push("browser/Android icon metadata must use the BACKPACK PNG");

if (!fs.existsSync(path.join(root, "public/backpack-os-icon-v4-192.png"))) failures.push("BACKPACK Android install icon file missing");
const pwaRegister = fs.readFileSync(path.join(root, "src/app/pwa-register.tsx"), "utf8");
if (!pwaRegister.includes('src="/backpack-os-icon-v4.svg"')) failures.push("PWA install card must display the approved BACKPACK artwork, not a generic symbol");
const offlinePage = fs.readFileSync(path.join(root, "src/app/offline/page.tsx"), "utf8");
if (!offlinePage.includes('src="/backpack-os-icon-v4.svg"') || !offlinePage.includes("BACKPACK")) failures.push("offline screen: visible BACKPACK artwork and identity are required");
if (!personalOS.includes("setupExamples") || !personalOS.includes("const setupCopy=setupExamples[s.category]") || !personalOS.includes("placeholder={setupCopy.backpack}") || !personalOS.includes("placeholder={setupCopy.space}") || !personalOS.includes("placeholder={setupCopy.about}")) failures.push("setup: category-aware Space examples and placeholders must be explicit");
if (!personalOS.includes("{!activeBackpackId&&<label>Backpack / OS name") || !personalOS.includes("{!activeBackpackId&&<label>Your name") || !personalOS.includes("activeBackpackId?\"Create Space ↗\":\"Create Backpack OS ↗\"")) failures.push("setup: adding a Space must inherit parent Backpack identity instead of asking for parent name and owner again");
if (personalOS.includes("}\\n function loadWorkspace")) failures.push("source: function declarations must be separated by real newlines, not escaped characters");
if (pwaRegister.includes("i13-install")) failures.push("PWA install card must use BACKPACK-owned styles, not inherited Iteration 13 class names");
for (const expected of ["BACKPACK OS | Your Personal Channel", "applicationName:\"BACKPACK OS\""]) if (!layout.includes(expected)) failures.push("layout: missing " + expected);
// Validate Apple install metadata semantically; whitespace and additional metadata fields are harmless.
if (!/appleWebApp\s*:\s*\{[^}]*\bcapable\s*:\s*true\b[^}]*\btitle\s*:\s*["']BACKPACK OS["']/s.test(layout)) failures.push('layout: missing appleWebApp capable=true and title="BACKPACK OS"');
const iconSvg = fs.readFileSync(path.join(root, "public/backpack-os-icon-v4.svg"), "utf8");
if (!iconSvg.includes("<svg") || !iconSvg.includes("shoulder straps") && !iconSvg.includes("fbbf24")) failures.push("BACKPACK icon: expected the dedicated backpack SVG artwork");
const sw = fs.readFileSync(path.join(root, "public/sw.js"), "utf8");
if (!/backpack-os-shell-v\d+/.test(sw)) failures.push("service worker: missing isolated cache namespace");
if (!sw.includes("/backpack-os-icon-v4-192.png")) failures.push("service worker: BACKPACK PNG icons missing from app shell");
if (/iteration13-icon-(?:180|192|512)\.(?:png|svg)/.test(JSON.stringify(manifest)) || /iteration13-icon-(?:180|192|512)\.(?:png|svg)/.test(appManifest) || /iteration13-icon-(?:180|192|512)\.(?:png|svg)/.test(layout)) failures.push("PWA identity: inherited Iteration 13 icon reference remains");
if (!/backpack-os-shell-v\d+/.test(sw)) failures.push("service worker: BACKPACK cache namespace is not isolated");
if (!sw.includes("/iphone-install") || !sw.includes("/iphone-install.svg")) failures.push("service worker: iPhone installation guide is not cached for offline use");

if (!pwaRegister.includes('src="/backpack-os-icon-v4.svg"')) failures.push("PWA install card must display the approved BACKPACK artwork");
if (!pwaRegister.includes("prompt.prompt()") || !pwaRegister.includes("setInstallable(true)")) failures.push("PWA install: native prompt is not connected to the branded install action");
if (!pwaRegister.includes('window.addEventListener("beforeinstallprompt", captureInstall)') || !pwaRegister.includes("event.preventDefault()")) failures.push("PWA install: browser install event capture is missing");
if (!pwaRegister.includes("window.__backpackInstallPrompt") || !layout.includes("backpack-early-install-capture")) failures.push("PWA install: early pre-hydration event capture is missing");
if (!pwaRegister.includes("DISMISS_FOR = 7 * 24 * 60 * 60 * 1000") || !pwaRegister.includes("dismissedRecently()")) failures.push("PWA install: dismissal persistence is missing");
if (!pwaRegister.includes('window.addEventListener("appinstalled", installed)')) failures.push("PWA install: installed-state cleanup is missing");
if (!pwaRegister.includes('navigator.serviceWorker.register("/sw.js", { updateViaCache: "none" })')) failures.push("PWA install: service-worker registration must bypass stale update metadata");
if (!pwaRegister.includes(".waiting") || !pwaRegister.includes("SKIP_WAITING") || !pwaRegister.includes("BACKPACK OS update ready")) failures.push("PWA update: waiting-worker refresh lifecycle is incomplete");

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
if (!personalOs.includes('className="bp-bottom-dock"') || !personalOs.includes('aria-label="Open Backpack owner admin"') || !personalOs.includes('aria-label="Open Business Operating System"')) failures.push("workspace navigation: Backpack and B.O.S. must remain in the bottom dock");
if (personalOs.includes('className="bp-backpack-link"') || /iteration13\.vercel\.app\/" target="_blank"/.test(personalOs)) failures.push("workspace navigation: top-nav switchers or forced new-tab B.O.S. links returned");
if (!personalCss.includes(".bp-bottom-dock{position:fixed") || !personalCss.includes("env(safe-area-inset-bottom)")) failures.push("workspace navigation: fixed bottom dock must respect the device safe area");
if (!personalOs.includes('setScreen("chooser")') || !personalOs.includes('Create new Backpack OS') || !personalOs.includes('OR LOAD AN EXISTING BACKPACK')) failures.push("workspace launcher: create-or-load choice must appear on app launch");
if (!personalOs.includes('Load Backpack ↗') || !personalOs.includes('INDEX_KEY') || !personalOs.includes('backpackName')) failures.push("workspace launcher: named existing Backpacks must be saved and loadable");
if (!personalOs.includes('backpack-legacy') || !personalOs.includes('backpack-os:workspaces:v1')) failures.push("workspace launcher: legacy single-Backpack data must migrate without loss");



for (const legacyAlias of ["public/icon.svg", "public/backpack-icon.svg"]) {
  const alias = fs.readFileSync(path.join(root, legacyAlias), "utf8");
  if (!/shoulder straps/i.test(alias) || !alias.includes("fbbf24")) failures.push(legacyAlias + ": legacy install artwork must resolve to the dedicated BACKPACK mark");
}
const shellVersion = sw.match(/const CACHE_VERSION = "(backpack-os-shell-v\d+)"/)?.[1];
if (shellVersion !== "backpack-os-shell-v32") failures.push("service worker: shell cache version must advance for the current BACKPACK identity");
if (!sw.includes('"/backpack-icon.svg?v=2"') || !sw.includes('"/icon.svg"')) failures.push("service worker: current branded backpack aliases must be precached");


const engagementTools = fs.readFileSync(path.join(root, "src/app/SpaceEngagementTools.tsx"), "utf8");
if (!personalOs.includes('import SpaceEngagementTools from "./SpaceEngagementTools"') || !personalOs.includes("recordStructured") || !personalOs.includes('category==="Home & Everyday Life"') || !personalOs.includes('category==="Creator / TV / Entertainment"')) failures.push("category engagement: grocery and creator tools must be connected to the customer account and owner settings");
if (!engagementTools.includes("quantity") || !engagementTools.includes("brand") || !engagementTools.includes("confirmedBy") || !engagementTools.includes("purchasedBy") || !engagementTools.includes("Complete shopping cycle") || !engagementTools.includes("days overdue")) failures.push("grocery engagement: structured item fields, separate confirmation/purchase identities and owner-controlled cycle countdown are required");
if (!engagementTools.includes("My Watchlist") || !engagementTools.includes("Creator programme suggestion") || !engagementTools.includes("Creator broken-link report") || !engagementTools.includes("Free TV") || !engagementTools.includes("External links")) failures.push("creator engagement: shelves, account watchlist, source suggestions and broken-link reports are required");
if (!personalOs.includes("Channel titles and updates stay hidden until the Space access checks are completed.") || personalOs.includes('visiblePosts.map(post=><button type="button" className="bp-button" key={post.id} onClick={()=>selectPublishedItem(post.id)}>Select for My account: {post.title}')) failures.push("privacy gate: private Space post titles must not be exposed before access checks");
if (!personalOs.includes('person?.role!=="viewer"') || !engagementTools.includes('role==="moderator"') || !engagementTools.includes('role==="contributor"')) failures.push("Space permissions: viewers must remain read-only and grocery purchase actions must be role-limited");
if (!personalOs.includes('{(restricted||vipOnly)&&(!signed||!allowed)?<><h1>Private <em>Space.</em></h1>') || !personalOs.includes('This word applies only to this Space. You will still need an invited name or approved VIP identity before entering.')) failures.push("privacy gate: private Space title, description and selected item title must remain hidden before identity approval");
if (!engagementTools.includes('const canShop=ownerMode||(canContribute&&(role==="owner"||role==="moderator"||role==="contributor"));') || !engagementTools.includes('const daysPast=Math.floor((current.getTime()-scheduled.getTime())/86400000)')) failures.push("grocery permissions and recurring cycle: purchase actions must obey the owner engagement toggle and completed cycles must advance from the scheduled date");
if (!personalCss.includes(".bp-grocery-item") || !personalCss.includes(".bp-creator-shelves")) failures.push("category engagement: compact grocery and creator layouts must be styled");
if (failures.length) {
  console.error("IDENTITY VERIFICATION FAILED");
  failures.forEach(failure => console.error(" - " + failure));
  process.exit(1);
}
console.log("IDENTITY VERIFIED — BACKPACK OS metadata and service-worker cache are isolated.");
