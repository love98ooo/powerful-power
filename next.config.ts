import type { NextConfig } from "next";

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export', // 启用SSG
  trailingSlash: true, // 添加尾部斜线，便于静态部署
  images: {
    unoptimized: true, // 静态导出时需要
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });
    return config;
  }
};

export default nextConfig;
