import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 🚫 Don't run ESLint during builds (Vercel won't block deploys)
    ignoreDuringBuilds: true,
  },
  /* config options here */
};

export default nextConfig;
