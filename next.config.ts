import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",
      },
      {
        protocol: "https",
        hostname: "animelist-52de5.web.app",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000"
      }
    ],
  }

  /*
  
    images: {
      domains: ['cdn.myanimelist.net', 'https://animelist-52de5.web.app/', 'http://localhost:3000'],
    }

  */
};

export default nextConfig;
