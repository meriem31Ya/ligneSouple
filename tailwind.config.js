/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}", // dossiers React + TS
    "./node_modules/@shadcn/ui/**/*.{ts,tsx}", // shadcn
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
