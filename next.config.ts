import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow access from LAN IPs during dev (phone testing).
  // Without this, Next.js blocks the HMR WebSocket and dev runtime
  // over cross-origin hosts, leaving framer-motion initial styles baked in.
  allowedDevOrigins: ["192.168.1.108", "192.168.1.*", "localhost"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
