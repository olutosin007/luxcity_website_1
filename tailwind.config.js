/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        archivo: ['Archivo', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}