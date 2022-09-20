/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {},
    fontFamily: {
      oswald: ['"Oswald"', ...defaultTheme.fontFamily.sans],
      bebas: ['"Bebas Neue cursive"', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
