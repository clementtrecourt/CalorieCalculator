const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to all of your template files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
