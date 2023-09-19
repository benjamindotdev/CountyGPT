/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme:{
      colors: {
        background: "#9F8082",
        primary: "#E85D75",
        secondary: "#8D918B",
        accent1: "#C76D7E",
        accent2: "#AD9B9A",
        white: '#fff'
      }
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    plugins: [require('daisyui')],
    daisyui: {
      themes: ["light", "dark", "corporate"],
    },
}

