/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(46 213 115)",
        secondary: "#4e81fb",
        gray: {
          DEFAULT: "#1C1C28",
          800: "#28293d",
          700: "#32334d",
        },
        slate: {
          DEFAULT: "rgb(74 75 109)",
        },
      },
      spacing: {
        22: "5.5rem",
        25: "6.25rem",
        42: "10.5rem",
        100: "6.25rem",
      },
      fontFamily: {
        Dana: "Dana",
        DanaMedium: "Dana Medium",
        DanaDemiBold: "Dana DemiBold",
        MorabbaLight: "Morabba Light",
        MorabbaMedium: "Morabba Medium",
        MorabbaBold: "Morabba Bold",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "0.625rem",
        },
      },
      boxShadow: {
        light: "0 1px 60px rgba(0,0,0,.05)",
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
