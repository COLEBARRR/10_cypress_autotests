const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '1n3gw6',
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://telnyx.com', 
    viewportWidth: 1920,           
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
