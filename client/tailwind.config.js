/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#f8bb13",
        red: "#FF6868",
        secondary: "#555555",
        primaryBg: "#FCFCFC",
        darkBg: "#1f2937",
        darkText: "#f1f5f9",
      },
    },
  },
  plugins: [require("daisyui")],
};
