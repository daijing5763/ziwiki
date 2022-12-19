/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      gridTemplateColumns: {
        '6': 'repeat(6, minmax(28px, 120px))',
      }


    },
  },
  plugins: [ require('@tailwindcss/forms'), require('tailwind-scrollbar')({ nocompatible: true }),],
  variants: {
    scrollbar: ["dark"],
  },
}