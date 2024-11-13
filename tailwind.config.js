/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'amazone': {
          'primary': '#232F3E',
          'secondary': '#37475A',
          'accent': '#FF9900',
          'light': '#FEBD69'
        }
      }
    }
  },
  plugins: []
}