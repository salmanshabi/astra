import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Required for GitHub Pages — assets are served under /astra/
  basePath: process.env.NODE_ENV === "production" ? "/astra" : "",
  images: { unoptimized: true },
  allowedDevOrigins: ["192.168.1.108", "192.168.1.*", "localhost"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
