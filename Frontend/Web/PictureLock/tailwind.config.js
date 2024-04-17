/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "orange-fruit": "#FFB54F",
        "red-apple": "#FF1540",
      },
    },
  },
  plugins: [require("daisyui")],
};