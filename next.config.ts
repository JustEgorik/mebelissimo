import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Фотографии пока берутся со старого сайта: оптимизатор Next забирает их
    // на сервере, поэтому на https-домене не возникает mixed content.
    // При переносе каталога в Supabase Storage этот блок заменяется.
    remotePatterns: [
      {
        protocol: "http",
        hostname: "mebelissimo.md",
        pathname: "/image/**",
      },
    ],
  },
};

export default nextConfig;
