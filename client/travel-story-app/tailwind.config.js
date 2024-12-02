/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    fontFamily:{
      display: ['Poppins', 'sans-serif'],
    },

    extend: {
      // colors used the project
      colors: {
        primary: '#05B6D3',
         secondary: '#EF863E',
      },
      backgroundImage:{
        'login-bg-img'
      }
    },
  },
  plugins: [],
}

