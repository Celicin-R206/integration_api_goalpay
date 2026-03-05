/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // app directory
    "./components/**/*.{js,ts,jsx,tsx}", // composants
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)", // ← ici ta variable CSS
      },
    },
  },
  plugins: [],
};
