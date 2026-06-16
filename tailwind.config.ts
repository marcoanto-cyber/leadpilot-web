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
          DEFAULT: "#0B1437",
          900: "#080F2A",
          800: "#0B1437",
          700: "#152253",
        },
        sky: {
          DEFAULT: "#3D7EFF",
          soft: "#6FA0FF",
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
        glow: "0 0 60px -15px rgba(61, 126, 255, 0.45)",
        coral: "0 12px 40px -12px rgba(255, 120, 73, 0.55)",
        card: "0 20px 50px -20px rgba(11, 20, 55, 0.25)",
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
