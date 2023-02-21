/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#01BCB9',
        'secondary': '#00D983'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'Shantell': ['Shantell Sans', 'cursive']
      }
    },
  },
  plugins: [],
}