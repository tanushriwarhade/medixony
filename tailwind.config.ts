import type { Config } from "tailwindcss";

const config: Config = {
content: [
  "./index.html",
  "./App.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./context/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        display: ["'Instrument Serif'", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        brand: {
          50: "#f0fafb",
          100: "#d9f2f5",
          200: "#b7e6ec",
          300: "#83d3de",
          400: "#48b8c8",
          500: "#2d9aad",
          600: "#277c92",
          700: "#256477",
          800: "#265363",
          900: "#234655",
          950: "#112d39",
        },
        accent: {
          DEFAULT: "#06b6d4",
          light: "#67e8f9",
          dark: "#0891b2",
        },
        surface: {
          DEFAULT: "#0f1923",
          card: "#162230",
          border: "#1e3245",
          muted: "#243b52",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-gradient":
          "radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.15) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(180, 80%, 50%, 0.15) 0px, transparent 50%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(6, 182, 212, 0.4)",
        "glow-sm": "0 0 20px -5px rgba(6, 182, 212, 0.3)",
        card: "0 4px 24px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
