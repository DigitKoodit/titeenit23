/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        landing:
          'url(https://digit.kuvat.fi/kuvat/2016/TiTeenit%202016%20%40Turku/antinkuvat/DSC_0698.JPG?img=img2048)',
      },
    },
  },
  plugins: [],
};
