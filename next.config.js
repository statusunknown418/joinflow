/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: [
    {
      source: "/:path",
      destination: "app.joinflow.vercel.app/:path",
    },
  ],
};

module.exports = nextConfig;
