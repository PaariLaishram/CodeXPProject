/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navbar':'rgb(0,96,50)',
        'submit-btn':"#35937A",
        'footer':'#006032',
        'sign-in-hover':'#002C04',
        'google-sign-in-hover':"#79FFEF"
      }
    },
  },
  plugins: [],
}

