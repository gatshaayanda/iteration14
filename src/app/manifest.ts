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
    background_color: "#f4f5f7",
    theme_color: "#155eef",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["lifestyle", "productivity"],
    prefer_related_applications: false,
    icons: [
      { src: "/backpack-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/iteration13-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/iteration13-icon-180.png", sizes: "180x180", type: "image/png", purpose: "any" }
    ],
    shortcuts: [
      {
        name: "Public channel",
        short_name: "Channel",
        description: "Open your personal channel",
        url: "/",
        icons: [{ src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "Individual account",
        short_name: "Account",
        description: "Open your channel account",
        url: "/?view=account",
        icons: [{ src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png" }]
      },
      {
        name: "Backpack",
        short_name: "Backpack",
        description: "Open the private owner workspace",
        url: "/?view=backpack",
        icons: [{ src: "/iteration13-icon-192.png", sizes: "192x192", type: "image/png" }]
      }
    ]
  };
}
