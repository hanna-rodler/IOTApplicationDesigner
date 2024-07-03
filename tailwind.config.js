/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
          'xs': '450px',
          'max-1515': {'max': '1515px'},
          'max-1280': {'max': '1280px'},
          'max-633': {'max': '633px'},
          'max-475': {'max': '475px'},
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontWeight: {
        normal: 400,
        semibold: 600,
      },
      fontSize: {
        xs: "0.6rem",
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
        accent: {
          DEFAULT: "#F28705",
        },
        gray: {
          fieldBg: "#F9FAF9",
          fieldBorder: "#D1D5DB",
        },
        actuator: "#6D6FB5",
        sensor: "#B64C72",
        mapping:"#0088A7",
        topic: "#038C8C",
        sidebar: "#F4F4F4",
        appBg: "#F8F9FB",
        cardBg: "#FEFEFE", // card background
        topbar: "#012E40",
      },
      maxHeight: {
        128: "32rem",
        112: "28rem",
      },
      height: {
        topBar: "3.125rem",
      },
      margin: {
        topBar: "3.125rem",
      },
      borderRadius: {
        btn: "5px",
        top: "5px 5px 0px 0px",
      },
      boxShadow: {
        'card': '0 3px 4px 0px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
};
