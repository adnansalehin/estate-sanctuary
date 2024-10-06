/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      MONGODB_URI: process.env.MONGODB_URI,
      DB_NAME: process.env.DB_NAME,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
}

export default nextConfig;
