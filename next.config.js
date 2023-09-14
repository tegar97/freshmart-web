/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["freshmart.oss-ap-southeast-5.aliyuncs.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Izinkan semua permintaan
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Izinkan semua asal
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
