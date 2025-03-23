/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "dark-green": "#0B7029", 
        "light-green": "#6D8B76", 
        "light-grey": "#F8F8F8",
        "dark-blue": "#003649",
        accent: {
          light: "#FACC15",
          DEFAULT: "#EAB308",
          dark: "#CA8A04",
        },
      },
    },
  },
  plugins: [],
}
