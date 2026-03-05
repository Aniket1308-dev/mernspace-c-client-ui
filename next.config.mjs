/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mernspace-project1308.s3.ap-south-1.amazonaws.com',
            },
        ],
    },
};

export default nextConfig;
