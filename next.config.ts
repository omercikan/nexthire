import type { NextConfig } from "next";

module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
};

export default nextConfig;
