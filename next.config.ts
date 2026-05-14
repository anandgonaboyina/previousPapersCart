import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Allow development access from local network (e.g., your phone/other laptop)
  allowedDevOrigins: ["10.11.208.230", "localhost"],
};

export default nextConfig;
