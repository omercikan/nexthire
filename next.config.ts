import type { NextConfig } from "next";

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
};

export default nextConfig;
