/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#00193F',
          'navy-light': '#0A2558',
          'navy-dark': '#00122E',
          teal: '#16B3A3',
          'teal-hover': '#109485',
          'teal-pale': '#CCFBF1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
