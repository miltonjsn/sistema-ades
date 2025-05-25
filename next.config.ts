import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    appDir: true, // garante que a pasta 'app' será usada como roteador
  },
};

export default nextConfig;
