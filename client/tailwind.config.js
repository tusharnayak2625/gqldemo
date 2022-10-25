/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'quote-bg': 'rgb(180, 212, 255)',
      }
    },
  },
  plugins: [],
}
