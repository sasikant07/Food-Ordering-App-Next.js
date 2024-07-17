/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['food-ordering-next.js.s3.amazonaws.com', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "food-ordering-next.js.s3.amazon.com",
      },
    ],
  },
};

export default nextConfig;
