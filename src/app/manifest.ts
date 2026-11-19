import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/?app=backpack-os-14",
    name: "BACKPACK OS",
    short_name: "BACKPACK",
    description: "A personal operating system for channels, individual accounts, VIP circles and private administration.",
    start_url: "/?app=backpack-os-14",
    scope: "/",
    display: "standalone",
    background_color: "#10243b",
    theme_color: "#155eef",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["lifestyle", "productivity"],
    prefer_related_applications: false,
    icons: [
      { src: "/backpack-os-icon-v4.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
    shortcuts: [
      { name: "Public channel", short_name: "Channel", description: "Open your personal channel", url: "/", icons: [{ src: "/backpack-os-icon-v4.svg", sizes: "any", type: "image/svg+xml" }] },
      { name: "Individual account", short_name: "Account", description: "Open your channel account", url: "/?view=account", icons: [{ src: "/backpack-os-icon-v4.svg", sizes: "any", type: "image/svg+xml" }] },
      { name: "Backpack", short_name: "Backpack", description: "Open the private owner workspace", url: "/?view=backpack", icons: [{ src: "/backpack-os-icon-v4.svg", sizes: "any", type: "image/svg+xml" }] },
    ],
  };
}
