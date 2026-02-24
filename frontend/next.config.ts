import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: { globalNotFound: true },
  output: "standalone",

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

export default nextConfig;
