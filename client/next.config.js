/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // You can add these as well
        // port: '',
        // pathname: 'arifscloud/image/upload/**',
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        // You can add these as well
        // port: '',
        // pathname: 'arifscloud/image/upload/**',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // You can add these as well
        // port: '',
        // pathname: 'arifscloud/image/upload/**',
      },
    ],
  },
};

module.exports = nextConfig;
