/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#03a696",
          DEFAULT: "#038C8C",
        },
        secondary: {
          DEFAULT: "#025159",
        },
        accent: {
          DEFAULT: "#F28705",
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
      borderRadius: {
        btn: "5px",
        top: "5px 5px 0px 0px",
      },
    },
  },
  plugins: [],
};
