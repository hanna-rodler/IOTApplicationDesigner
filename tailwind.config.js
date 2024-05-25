/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontWeight: {
        normal: 400,
        semibold: 600,
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.5rem",
      },
      colors: {
        primary: {
          light: "#03a696",
          DEFAULT: "#038C8C",
        },
        secondary: {
          DEFAULT: "#025159",
        },
        gray: {
          fieldBg: "#F9FAF9",
          fieldBorder: "#D1D5DB",
        },
        sidebar: "#F4F4F4",
        appBg: "#F8F9FB",
        cardBg: "#FEFEFE", // card background
        orange: {
          edge: "#F4F4F4",
        },
      },
      maxHeight: {
        128: "32rem",
        112: "28rem",
      },
      borderRadius: {
        btn: "5px",
        top: "5px 5px 0px 0px",
      },
    },
  },
  plugins: [],
};
