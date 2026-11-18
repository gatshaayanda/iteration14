import type {Metadata,Viewport} from "next";
import {headers} from "next/headers";
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next";
import PwaRegister from "@/app/pwa-register";
import Script from "next/script";
import "./globals.css"; import "./pwa.css"; import "./install-card.css"; import "./data-quiet.css";
const siteUrl=process.env.NEXT_PUBLIC_BASE_URL;
const EMBEDDED_BROWSER_PATTERN=/WhatsApp|Instagram|FBAN|FBAV|Messenger|Line[/]|Twitter|TikTok|Snapchat/i;
export const metadata:Metadata={...(siteUrl?{metadataBase:new URL(siteUrl)}:{}),title:{default:"BACKPACK OS",template:"%s | BACKPACK OS"},description:"Your personal operating system for My Life, My Channel and everyday resources.",applicationName:"BACKPACK OS",keywords:["BACKPACK OS","personal operating system","My Channel","My Life","personal organisation"],alternates:{canonical:"/"},openGraph:{type:"website",siteName:"BACKPACK OS",title:"BACKPACK OS",description:"Organise My Life. Publish My Channel. Your personal operating system."},twitter:{card:"summary",title:"BACKPACK OS",description:"Organise My Life. Publish My Channel."},icons:{icon:[{url:"/iteration13-icon.svg",type:"image/svg+xml"},{url:"/iteration13-icon-192.png",sizes:"192x192",type:"image/png"},{url:"/iteration13-icon-512.png",sizes:"512x512",type:"image/png"}],apple:{url:"/iteration13-icon-180.png",sizes:"180x180",type:"image/png"}},manifest:"/manifest.webmanifest",appleWebApp:{capable:true,title:"BACKPACK OS",statusBarStyle:"default"}};
export const viewport:Viewport={themeColor:"#315f9f",colorScheme:"light"};
export default async function RootLayout({children}:{children:React.ReactNode}){
 const requestHeaders=await headers();
 const userAgent=requestHeaders.get("user-agent")||"";
 const requestedWith=requestHeaders.get("x-requested-with")||"";
 // A social referrer does not prove this browser is embedded: Chrome opened from WhatsApp
 // must not be trapped in the in-app-browser install gate.
 const embedded=EMBEDDED_BROWSER_PATTERN.test(userAgent)
   || (/Android/i.test(userAgent)&&/\bwv\b/i.test(userAgent))
   || /^(com\.whatsapp|com\.instagram\.android|com\.facebook\.katana|com\.facebook\.lite|com\.facebook\.orca)$/i.test(requestedWith);
 const android=/Android/i.test(userAgent);
 return <html lang="en"><body style={embedded?{overflow:"hidden"}:undefined}><Script id="iteration14-early-install-capture" strategy="beforeInteractive">{`
(function () {
  window.addEventListener("beforeinstallprompt", function (event) {
    var standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
    if (standalone || window.__iteration14PwaListenerReady === true) return;
    event.preventDefault();
    window.__iteration14InstallPrompt = event;
  });
})();
`}</Script>{children}<PwaRegister initialEmbedded={embedded} initialAndroid={android}/><Analytics/><SpeedInsights/></body></html>
}
