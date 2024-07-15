/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "fluo" : "#B6FF00"
      },
      keyframes: {
        slideIn:{
          '0%': { transform: 'translateX(100%)' },
        },
        slideReverse:{
          '0%': { transform: 'translateX(-80%)' },
        }
      },
      animation: {
        'slide-in': "slideIn .7s ease",
        'slide-in-reverse': "slideReverse 1s ease",
        'spin-slow': 'spin 15s linear infinite',
      }
    },
  },
  plugins: [],
}