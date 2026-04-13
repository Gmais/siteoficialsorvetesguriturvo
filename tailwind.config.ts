/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        verde: "#009c3b",
        amarelo: "#ffdf00",
        azul: "#002776",
        laranja: "#ff6b00",
        creme: "#fffbf0",
        dark: "#111827",
      },
    },
  },
  plugins: [],
}
