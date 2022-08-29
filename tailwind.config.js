// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
module.exports = {
  // purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        "hero-pattern": "url('pattern-bg.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
