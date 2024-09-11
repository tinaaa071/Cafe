/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans TC', ...fontFamily.sans],
      },
      fontSize: {
        xxs: ['10px', '12px']
      },
      colors: {
        'B1': '#A2866D',
        'B2': '#E0DCCA',
        'B3': '#EFECE5',
        'B4': '#F8F7F2'
      },
      screens: {
        xs: '512px'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}

