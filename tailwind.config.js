/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: `"Archivo Black", sans-serif`,
      colors: {
        primaryVeryDark: "#072231",
        primaryDark: "#214A61",
        primaryLight: "#338EC0;",
      },
    },
  },
  plugins: [],
};
