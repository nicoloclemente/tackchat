/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  colors: {
    'blue': '#00A3FF',
    'orange': '#FF5C00',
    'yellow': '#FFDB00',
    'gray-dark': '#406c80',
  },
  plugins: [
    require('daisyui'),
  ],
}