/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js,ejs}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.rtl': {
          direction: 'rtl',
        },
        '.ltr': {
          direction: 'ltr',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
};