const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
    fontFamily: {
      sans: ['Helvetica Now Display', 'Helvetica', 'sans-serif']
    }
  },

  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};

module.exports = config;
