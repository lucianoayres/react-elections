module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
    animation: ['responsive', 'motion-safe', 'motion-reduce']
  },
  plugins: [
    require('daisyui')
  ],
};
