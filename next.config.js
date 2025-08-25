
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@tanstack/react-query']
  },
  images: {
    domains: ['placehold.co', 'localhost'],
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://auto-garage-be.onrender.com'
  }
}

module.exports = nextConfig