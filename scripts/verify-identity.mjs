import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const failures=[];
const read=relative=>fs.readFileSync(path.join(root,relative),"utf8");
const manifest=JSON.parse(read("public/manifest.webmanifest"));
const appManifest=read("src/app/manifest.ts");
const layout=read("src/app/layout.tsx");
const pwa=read("src/app/pwa-register.tsx");
const page=read("src/app/page.tsx");
const personal=read("src/app/PersonalOS.tsx");
const css=read("src/app/personal-os.css");
const sw=read("public/sw.js");
const check=(ok,message)=>{if(!ok)failures.push(message);};

check(manifest.name==="Iteration 14"&&manifest.short_name==="Iteration 14","web manifest must identify Iteration 14");
check(manifest.theme_color==="#315f9f","web manifest must use the DATA × QUIET accent");
check(appManifest.includes('name: "Iteration 14"')&&appManifest.includes('short_name: "Iteration 14"'),"Next app manifest must identify Iteration 14");
check(layout.includes('default:"Iteration 14 | Personal OS"')&&layout.includes('applicationName:"Iteration 14"'),"page metadata must identify Iteration 14 Personal OS");
check(layout.includes('title:"Iteration 14"'),"Apple install metadata must identify Iteration 14");
check(pwa.includes("Install Iteration 14")&&pwa.includes("ITERATION 14 · PERSONAL OS"),"branded PWA install card must identify Iteration 14");
check(page.includes('import PersonalOS from "@/app/PersonalOS"')&&page.includes("<PersonalOS />"),"root route must render the personal workspace");
check(personal.includes("My Life")&&personal.includes("My Channel")&&personal.includes("iteration14:personal-space:v1"),"personal workspace must expose My Life and My Channel with an isolated data key");
check(personal.includes("localStorage.setItem")&&personal.includes("localStorage.getItem"),"personal workspace must persist and restore local records");
check(css.includes(".po-stat-grid")&&css.includes(".po-sidebar")&&css.includes("@media(max-width:700px)"),"personal workspace must include structured desktop and mobile layouts");
check(sw.includes('const CACHE_VERSION = "iteration14-shell-v1"')&&sw.includes('const MEDIA_CACHE = "iteration14-media-v1"'),"service worker caches must be isolated for Iteration 14");
for(const icon of manifest.icons||[])check(fs.existsSync(path.join(root,"public",icon.src.replace(/^\//,""))),"manifest icon asset missing "+icon.src);
for(const rel of ["src/app/iphone-install/page.tsx","public/iphone-install.svg"])check(fs.existsSync(path.join(root,rel)),"protected install asset missing "+rel);
check(layout.includes("beforeinstallprompt")&&layout.includes("__iteration14InstallPrompt"),"early native install prompt capture is missing");
check(pwa.includes("await prompt.prompt()")&&pwa.includes("setCanInstall(true)"),"native install action is not connected to the retained prompt");
check(pwa.includes("isIosSafari()")&&pwa.includes('installState === "embedded"'),"iOS install guide and embedded-browser gate must remain");
if(failures.length){console.error("IDENTITY VERIFICATION FAILED");failures.forEach(x=>console.error(" - "+x));process.exit(1);}
console.log("IDENTITY VERIFIED — Iteration 14 Personal OS, My Life/My Channel and isolated PWA shell.");
