import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Partial Prerendering : le shell statique est généré au build,
  // les <Suspense> dynamiques streament à la requête
  cacheComponents: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
