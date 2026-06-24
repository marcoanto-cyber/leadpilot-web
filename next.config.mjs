/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Solo importa lo que se usa de estas librerías pesadas (tree-shaking real).
  experimental: {
    optimizePackageImports: ["framer-motion", "@react-three/drei", "three"],
  },
};

export default nextConfig;
