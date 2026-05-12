/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#131313",
        secondary: "#94da32",
        primary: "#deffa4",
        surface: "#20201f",
        outline: "#434938",
      },

      fontFamily: {
        body: ["Inter"],
        display: ["Space Grotesk"],
      },

      spacing: {
        gutter: "24px",
        xl: "80px",
      },
    },
  },
  plugins: [],
};