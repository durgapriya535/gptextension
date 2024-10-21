module.exports = {
  content: [
    './entrypoints/**/*.{html,js,jsx,ts,tsx}', // Include all files inside entrypoints folder
    './popup/**/*.{html,js,jsx,ts,tsx}',       // Include all files inside popup folder
    './public/**/*.html',                      // If you have any public HTML files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
