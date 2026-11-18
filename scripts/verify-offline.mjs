import fs from "node:fs";

const read = path => fs.readFileSync(new URL(path, import.meta.url), "utf8");
const sw = read("../public/sw.js");
const personal = read("../src/app/PersonalOS.tsx");
const extensions = read("../src/app/BackpackExtensions.tsx");
const root = read("../src/app/page.tsx");
const css = read("../src/app/personal-os.css");
const pwa = read("../src/app/pwa-register.tsx");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

check(root.includes("<PersonalOS />"), "the root route must open BACKPACK OS");
check(personal.includes("My Life") && personal.includes("My Channel"), "the two existing Backpack modes must remain available");
check(personal.includes("EverydayWorkspace") && personal.includes("ChannelMediaWorkspace"), "approved everyday and channel extensions must be integrated into existing modes");
check(personal.includes("localStorage.setItem") && personal.includes("localStorage.getItem"), "existing local records must persist and restore");
check(personal.includes("Lists & plans") && personal.includes("Notes & records") && personal.includes("Projects"), "existing My Life workflows must remain");
check(personal.includes('kind:"Announcement"|"Episode"|"Video"|"Link"') && personal.includes("Useful link (website, article, tool, reference)"), "My Channel must support first-class useful links");
check(personal.includes("http or https") && personal.includes("safeMediaUrl"), "external channel resources must validate safe web protocols");
check(extensions.includes("Purchasing, suppliers, savings and household stock") && extensions.includes("Savings objective"), "My Life extensions must include needs, suppliers, savings and household stock");
check(extensions.includes("authorised") && extensions.includes("Directory only"), "media references must remain limited to authorised sources and must not redistribute streams");
check(css.includes(".po-mobile-switch") && css.includes(".po-stat-grid"), "the personal workspace must retain responsive controls and data panels");
check(/const CACHE_VERSION = "iteration14-shell-v1"/.test(sw), "the app shell must use the isolated Iteration 14 cache namespace");
check(/const MEDIA_CACHE = "iteration14-media-v1"/.test(sw), "the media cache must use the isolated Iteration 14 namespace");
check(sw.includes('event.waitUntil(self.skipWaiting())'), "worker updates must wait for the user's explicit refresh action");
check(sw.includes("navigationPreload.enable()") && sw.includes("event.preloadResponse"), "navigation preload must be optional and used when available");
check(sw.includes("function isSafePublicHtml") && sw.includes("private|no-store"), "private and no-store pages must not be cached");
check(sw.includes("const MEDIA_LIMIT = 24") && sw.includes("const MEDIA_MAX_BYTES = 4 * 1024 * 1024"), "the offline media cache must remain bounded");
check(sw.includes('request.destination === "image"') && sw.includes('event.respondWith(cacheMediaRequest(request, event))'), "only approved image requests should use the media cache");
check(!pwa.includes("retryPendingOrderNotifications") && !pwa.includes("plug-pending-order-notification-"), "business-order push delivery must not run in BACKPACK OS");

if (failures.length) {
  console.error("BACKPACK OS VERIFICATION FAILED");
  failures.forEach(failure => console.error(" - " + failure));
  process.exit(1);
}
console.log("BACKPACK OS VERIFIED — existing modes, local records, integrated extensions, useful links and isolated offline shell.");
