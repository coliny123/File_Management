/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'customIconBox': '0px 4px 10px 0px rgba(0, 0, 0, 0.10)',
      }
    },
  },
  plugins: [],
}

