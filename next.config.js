/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["freshmart.oss-ap-southeast-5.aliyuncs.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig
