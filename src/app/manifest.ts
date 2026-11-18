import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "BACKPACK OS",
    short_name: "BACKPACK",
    description: "A personal operating system for channels, individual accounts, VIP circles and private administration.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f6f5f0",
    theme_color: "#155eef",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["lifestyle", "productivity"],
    prefer_related_applications: false,
    icons: [
      { src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/iteration13-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/iteration13-icon-180.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/iteration13-icon-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any" },
      
      { src: "/backpack-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }
    ],
    shortcuts: [
      {
        name: "Browse services",
        short_name: "Services",
        description: "Explore the service menu and submit a request",
        url: "/",
        icons: [{ src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "My account",
        short_name: "Account",
        description: "Review your local demo requests",
        url: "/?view=account",
        icons: [{ src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "Admin demo",
        short_name: "Admin",
        description: "Open the local prototype operations panel",
        url: "/#admin",
        icons: [{ src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png" }]
      }
    ]
  };
}
