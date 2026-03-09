/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    YOUR_CLIENT_ID_FROM_DASHBOARD: process.env.YOUR_CLIENT_ID_FROM_DASHBOARD,
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
    HOST: process.env.HOST,
  },
};

export default nextConfig;
