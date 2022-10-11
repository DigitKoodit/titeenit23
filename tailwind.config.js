/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        landing:
          'url(https://digit.kuvat.fi/kuvat/2017/TiTeenien%20taistot%202017/114.jpg?img=img2048)',
      },
    },
  },
  plugins: [],
};
