module.exports = {
    reactStrictMode: true,
    env: {
      API_URL: process.env.API_URL || 'http://localhost:5000/api'
    },
    images: {
      domains: ['images.unsplash.com', 'upload.wikimedia.org'],
    }
  };