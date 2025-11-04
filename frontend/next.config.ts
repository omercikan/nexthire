import type { NextConfig } from "next";

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },

      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
};

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  experimental: { globalNotFound: true },
};

export default nextConfig;
