/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

    colors:{
      primary:'#d71920'
    },
    height: {
      '95vh': '93.2vh',
    }
    },
  },
  plugins: [],
}

