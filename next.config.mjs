/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // unoptimized: true, // Removed for performance
  },
};

export default nextConfig;
