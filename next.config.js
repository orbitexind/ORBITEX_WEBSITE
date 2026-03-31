/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.71.132.68'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's0.wordpress.com',
        pathname: '/**',
        
      },
    ],
  },
}

module.exports = nextConfig
