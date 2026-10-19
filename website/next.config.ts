import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Compile the sibling workspaces (../mobile-website, ../shared) as part of this app.
    externalDir: true,
  },
};

export default nextConfig;
