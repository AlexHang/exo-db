/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
      domains: ['exoplanets.nasa.gov'],
    },
    experimental: {
      serverActions: true,
    },
  }
  
  export default nextConfig