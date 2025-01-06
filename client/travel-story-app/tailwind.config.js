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
      colors: {
        primary: '#05B6D3',
         secondary: '#EF863E',
      },
      backgroundImage:{
        'login-bg-img': "url('/images/login-bg-img.jpg')",
        'signup-bg-img': "url('/images/signup-bg-img.jpg')",
      }
    },
  },
  plugins: [],
} 

