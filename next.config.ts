import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // TODO: Remove once all TS errors are fixed
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
