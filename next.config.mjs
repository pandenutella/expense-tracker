/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/budget",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
