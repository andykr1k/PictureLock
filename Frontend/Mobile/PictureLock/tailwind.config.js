/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange-fruit": "#FFB54F",
        "red-apple": "#FF1540",
        "light-content": "#363732",
        "dark-content": "#878C8F",
        "light-btn": "#7C7C7C",
        "dark-btn": "#DCE1E9",
        "tooltips": "#565554",
        "dark-bg": "#454A45",
        "light-bg": "#EDEDED",
      },
    },
  },
  plugins: [],
};