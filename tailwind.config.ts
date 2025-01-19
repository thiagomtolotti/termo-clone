/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#FAFAFF",
        },
        brown: {
          100: "#312A2C",
          300: "#4C4347",
          400: "#615458",
          600: "#6E5C62",
        },
        blue: "#009AFE",
        green: "#3AA394",
        yellow: "#D3AD69",
      },
    },
  },
  plugins: [],
};
