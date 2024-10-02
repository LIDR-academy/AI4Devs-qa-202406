const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Define the folder for your test specs
    specPattern: 'frontend/cypress/integration/**/*.js', // Adjust as needed

    // Optional: Set the base URL for your application
    baseUrl: 'http://localhost:3000', // Replace this with your actual app's URL
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
