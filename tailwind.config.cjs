const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
    fontFamily: {
      sans: ['Archivo', 'Helvetica', 'sans-serif']
    }
  },

  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};

module.exports = config;
