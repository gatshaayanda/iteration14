import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "iB Backpack",
    short_name: "iB Backpack",
    description: "Your personal space to organise everyday life and publish your own channel.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f6f5f0",
    theme_color: "#155eef",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["business", "productivity"],
    prefer_related_applications: false,
    icons: [
      { src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/iteration13-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/iteration13-icon-180.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/iteration13-icon-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any" },
      
      { src: "/iteration13-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }
    ],
    shortcuts: [
      {
        name: "Organise my life",
        short_name: "Organise",
        description: "Open your personal lists, plans, notes and records",
        url: "/",
        icons: [{ src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "My Channel",
        short_name: "Channel",
        description: "Open your personal publishing space",
        url: "/?view=account",
        icons: [{ src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "My Backpack",
        short_name: "Backpack",
        description: "Open your personal operating space",
        url: "/#admin",
        icons: [{ src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png" }]
      }
    ]
  };
}
