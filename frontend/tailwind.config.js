/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      petrol: "#2B9D8F",
      "green-dark": "#274653",
      "light-red": "#A16171",
      white: "#FFFFFF",
      yellow: "#E9C46A",
      disabled: "#EDEDED",
      red: "#97233F",
    },
    backgroundImage: {
      "hero-pattern": "url('/images/hero.png')",
    },
    fontFamily: {
      sans: ["Inter", "system-ui"],
    },
  },
  plugins: [],
}
