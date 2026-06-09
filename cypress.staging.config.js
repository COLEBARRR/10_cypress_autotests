const { defineConfig } = require('cypress')
const baseConfig = require('./cypress.config.js')

module.exports = defineConfig({
  ...baseConfig,
  e2e: {
    ...baseConfig.e2e,
    baseUrl: 'https://staging.telnyx.com',
  },
})