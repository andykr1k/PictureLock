/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "orange-500": "#F97316",
        "red-apple": "#FF1540",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
};
