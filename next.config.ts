import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: new URL(process.env.WP_URL!).hostname },
      { protocol: "http", hostname: new URL(process.env.WP_URL!).hostname },
    ],
  },
  experimental: {},
};

export default nextConfig;
