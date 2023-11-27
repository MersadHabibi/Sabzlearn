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
          500: "#94a3b8",
          700: "#32334d",
          800: "#28293d",
        },
        slate: {
          DEFAULT: "#4a4b6d",
        },
      },
      spacing: {
        15: "3.75rem",
        17: "4.25rem",
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
      backgroundImage: {
        "conic-gradient": "conic-gradient(var(--tw-gradient-stops))",
        "instagram-section": "url('../images/section-pattern.png'), linear-gradient(to right, #502ED6, #CD2F6A, #FFE354)",
        "instagram-section-br":
          "url('../images/section-pattern.png'), linear-gradient(to bottom right, #502ED6, #CD2F6A, #FFE354)",
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
