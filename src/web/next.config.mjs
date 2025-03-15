/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['upload.wikimedia.org', 'images-assets.nasa.gov', 'science.nasa.gov'],
  },
};

export default nextConfig;
