/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          space: {
            dark: '#0f172a',
            light: '#1e293b',
            accent: '#6366f1',
          }
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
    ],
  }