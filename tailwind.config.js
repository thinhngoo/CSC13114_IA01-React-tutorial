/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#ffffff",
        background: "#333333",
        foreground: "#111111",
        hover: "#222222",
      },
    },
  },
  plugins: [],
};
