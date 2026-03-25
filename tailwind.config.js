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
        background: "var(--df-background)",
        foreground: "var(--df-foreground)",
        muted: {
          DEFAULT: "var(--df-muted)",
          foreground: "var(--df-muted-foreground)",
        },
        card: {
          DEFAULT: "var(--df-card)",
          foreground: "var(--df-card-foreground)",
        },
        border: "var(--df-border)",
        diversy: {
          primary: "#005EE0",
          "primary-hover": "#0066F5",
          dark: "#0A0B0D",
        },
      },
      ringOffsetColor: {
        background: "var(--df-background)",
      },
    },
  },
  plugins: [],
};
