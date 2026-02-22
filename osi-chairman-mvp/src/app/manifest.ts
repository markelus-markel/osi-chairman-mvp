import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Кабинет председателя ОСИ",
    short_name: "ОСИ",
    description: "Голосовой помощник для управления ОСИ",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#0ea5e9",
    orientation: "portrait-primary",
    lang: "ru",
    categories: ["productivity", "utilities"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    // ↓ убирает предупреждение про Richer PWA Install UI
    screenshots: [
      {
        src: "/screenshots/desktop.png",
        sizes: "1280x720",
        type: "image/png",
        // @ts-ignore — form_factor пока не в типах Next.js
        form_factor: "wide",
      },
      {
        src: "/screenshots/mobile.png",
        sizes: "412x915",
        type: "image/png",
      },
    ],
  };
}