/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#06090C",
        panel: "#0F151A",
        accent: {
          DEFAULT: "#00A8E8",
          light: "#6FD8FF",
          muted: "#1B4A5E",
        },
        cream: "#EDF3F5",
        stone: "#93A6AD",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
