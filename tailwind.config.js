/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0A0B",
          900: "#111113",
          800: "#1A1A1D",
          700: "#242428",
          600: "#3A3A40",
          400: "#7A7A82",
          200: "#D4D4D8",
        },
        paper: {
          50: "#FFFFFF",
          100: "#FAFAF9",
          200: "#F1F0EE",
        },
        accent: {
          DEFAULT: "#0A0A0B",
          soul: "#E4002B", // hanko-red seal accent, used sparingly (streak flame, seal stamp)
        },
      },
      fontFamily: {
        display: ["'Zen Kaku Gothic New'", "'Noto Sans JP'", "sans-serif"],
        body: ["'Inter'", "'Noto Sans'", "sans-serif"],
        jp: ["'Noto Sans JP'", "sans-serif"],
      },
      borderRadius: {
        card: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.12)",
        "card-hover": "0 2px 4px rgba(0,0,0,0.06), 0 16px 32px -12px rgba(0,0,0,0.18)",
        seal: "0 0 0 3px rgba(228,0,43,0.08)",
      },
      keyframes: {
        "pop-in": {
          "0%": { opacity: 0, transform: "scale(0.92) translateY(6px)" },
          "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
        },
        "flame-flicker": {
          "0%, 100%": { transform: "scale(1) rotate(-1deg)" },
          "50%": { transform: "scale(1.06) rotate(1deg)" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.28s cubic-bezier(0.16,1,0.3,1) both",
        flicker: "flame-flicker 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
