import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ['169.254.83.107'],

    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
                pathname: '/storage/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/storage/**',
            },
        ],
    },
};

export default nextConfig;
