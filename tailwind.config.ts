import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2fbf4",
          100: "#e1f6e6",
          200: "#c4eed0",
          300: "#96dfa9",
          400: "#60c67c",
          500: "#22a344",
          600: "#168334",
          700: "#13682c",
          800: "#135326",
          900: "#114421",
          950: "#052611",
        },
        sage: {
          50: "#f7f8f6",
          100: "#edece7",
          200: "#dbdbd2",
          300: "#c0c0b3",
          400: "#9e9e8f",
          500: "#7f7f70",
          600: "#636357",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(16, 75, 34, 0.06), 0 2px 6px -1px rgba(16, 75, 34, 0.04)",
        card: "0 10px 30px -4px rgba(16, 75, 34, 0.08), 0 4px 10px -2px rgba(16, 75, 34, 0.03)",
        elevated: "0 20px 40px -10px rgba(16, 75, 34, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
