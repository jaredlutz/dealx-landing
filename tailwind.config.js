/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        diversy: {
          primary: "#005EE0",
          "primary-hover": "#0066F5",
          dark: "#0A0B0D",
        },
      },
    },
  },
  plugins: [],
};
