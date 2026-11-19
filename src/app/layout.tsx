import type {Metadata,Viewport} from "next";
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next";
import PwaRegister from "@/app/pwa-register";
import "./globals.css";
import "./pwa.css";

const siteUrl=process.env.NEXT_PUBLIC_BASE_URL||"https://iteration14.vercel.app";
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"BACKPACK OS | Your Personal Channel",template:"%s | BACKPACK OS"},description:"A personal operating system for your channel, individual accounts, VIP circles and private Backpack.",applicationName:"BACKPACK OS",keywords:["BACKPACK OS","Personal OS","channel","individual accounts","VIP circles","Backpack"],alternates:{canonical:"/"},openGraph:{type:"website",url:siteUrl,siteName:"BACKPACK OS",title:"BACKPACK OS | Personal Channel",description:"Your personal channel, individual accounts, VIP circles and private Backpack."},twitter:{card:"summary",title:"BACKPACK OS | Personal Channel",description:"Your personal channel and private Backpack, online and offline."},icons:{icon:[{url:"/backpack-os-icon-v2.png",type:"image/png",sizes:"192x192"},{url:"/backpack-os-icon-v2.svg",type:"image/svg+xml",sizes:"any"}],shortcut:[{url:"/backpack-os-icon-v2.png",type:"image/png",sizes:"192x192"}],apple:{url:"/backpack-os-icon-v2.png",sizes:"192x192",type:"image/png"}},manifest:"/manifest.webmanifest",appleWebApp:{capable:true,title:"BACKPACK OS",statusBarStyle:"default"}};
export const viewport:Viewport={themeColor:"#155eef",colorScheme:"light"};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><head><link rel="icon" href="/backpack-os-icon-v2.png" type="image/png"/><link rel="apple-touch-icon" href="/backpack-os-icon-v2.png"/></head><body><PwaRegister/>{children}<Analytics/><SpeedInsights/></body></html>;
}
