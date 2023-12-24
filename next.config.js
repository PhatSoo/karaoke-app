/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_SERVER: "http://localhost:8000",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
