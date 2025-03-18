/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#60a5fa",
          DEFAULT: "#3b82f6",
          dark: "#2563eb",
        },
        danger: "#ef4444",
        warning: "#f59e0b",
        success: "#10b981",
      },
      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
