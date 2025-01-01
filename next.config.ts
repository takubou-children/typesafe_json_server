import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.resolve.fallback.fs = require.resolve("fs"); // fsの解決を追加
    return config;
  },
};

export default nextConfig;
