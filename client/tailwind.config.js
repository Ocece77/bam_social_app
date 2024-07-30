/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors:{
        "fluo" : "#B6FF00",
        "blkblue" : "#0e0f19"
      },
      keyframes: {
        slideIn:{
          '0%': { transform: 'translateX(100%)' },
        },
        slideReverse:{
          '0%': { transform: 'translateX(-80%)' },
        },
        fade: {
          '0%': {  opacity : 0 },
          '100%': {  opacity:1 },
        },
        heartBurst :{
          '0%': {backgroundPosition:'left'},
          '100%':{ backgroundPosition:'right' }
        }
      },
      animation: {
        'fade': 'fade .2s ease-in ',
        'slide-in': "slideIn .7s ease",
        'slide-in-reverse': "slideReverse 1s ease",
        'spin-slow': 'spin 15s linear infinite',
        "like-anim" : "heartBurst .8s steps(28) 1",
        "dislike-anim" : "heartBurst .8s steps(28) 1 reverse"

      }
    },
  },
  plugins: [],
}