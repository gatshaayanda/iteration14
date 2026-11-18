import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "BACKPACK OS",
    short_name: "BACKPACK",
    description: "Your personal operating system for My Life, My Channel and everyday resources.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f3f5f7",
    theme_color: "#315f9f",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["lifestyle", "productivity"],
    prefer_related_applications: false,
    icons: [
      { src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/iteration13-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/iteration13-icon-180.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/iteration13-icon-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any" },
      { src: "/iteration13-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }
    ],
    shortcuts: [
      { name: "My Life", short_name: "My Life", description: "Open your personal lists, plans, notes and projects", url: "/", icons: [{ src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png" }] },
      { name: "My Channel", short_name: "Channel", description: "Open your personal publishing workspace", url: "/?mode=channel", icons: [{ src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png" }] }
    ]
  };
}
