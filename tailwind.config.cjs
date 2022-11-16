/** @type {import('tailwindcss').Config} */
const defaultTheme = require('./node_modules/tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        form: '0px 1px 6px rgba(0, 0, 0, 0.1)'
      },
      colors: {
        text: '#333333',
        lightText: '#4F4F4F',
        lighterText: '#828282',
        veryLightText: '#BDBDBD',
        paleRed: '#EB5757',
        divider: '#F2F2F2'
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        mulish: ['Mulish, sans-serif']
      }
    }
  },
  plugins: []
};
