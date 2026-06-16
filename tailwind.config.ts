import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#05080F",
          900: "#03050B",
          800: "#0A1024",
          700: "#131D44",
        },
        sky: {
          DEFAULT: "#4D8BFF",
          soft: "#7FB0FF",
        },
        coral: {
          DEFAULT: "#FF7849",
          dark: "#F2602E",
        },
        amber: {
          DEFAULT: "#FFC56E",
        },
        ink: "#0C1733",
        mist: "#5B6B8C",
        cloud: "#F4F7FB",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        glow: "0 0 70px -12px rgba(77, 139, 255, 0.6)",
        coral: "0 12px 44px -10px rgba(255, 120, 73, 0.65)",
        card: "0 20px 50px -20px rgba(3, 5, 11, 0.55)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(1.25)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
        drift: "drift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
