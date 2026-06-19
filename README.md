# Telnyx Cypress E2E Tests

This repository contains an end-to-end smoke test suite for the **Telnyx** website, built with **Cypress** using the **Page Object Model (POM)** architectural design pattern.

The project includes 10 automated test cases that cover key user flows: homepage loading, Contact Us navigation, pricing pages, form validation, careers navigation, chat interaction, and cookie banner handling.

---
## Quick Links

- **GitHub Repository:** [View Repository](https://github.com/COLEBARRR/10_cypress_autotests)
- **CI/CD Pipeline:** [View GitHub Actions Runs](https://github.com/COLEBARRR/10_cypress_autotests/actions)
- **Test Reports:** [View Cypress Cloud Dashboard](https://cloud.cypress.io/projects/1n3gw6/runs)
- **Test Cases:** [View Google Docs test cases](https://docs.google.com/spreadsheets/d/1JRK-pL_pn71jGFu6urKOmFrr4flrFr2he1ZARNJyjno/edit?usp=sharing)

---
## Prerequisites

Before running the tests, make sure you have installed:

- **Node.js**
- **npm**

You can check your installed versions with:

node -v
npm -v

---
## Installation

Clone the repository:

git clone [https://github.com/COLEBARRR/10_cypress_autotests.git](https://github.com/COLEBARRR/10_cypress_autotests.git)

Go to the project folder:

cd 10_cypress_autotests

Install project dependencies:

npm install

---
## How To Run Tests

The project uses npm scripts from package.json to make Cypress commands shorter and easier to run.

### Open Cypress UI

npm run cy:open

Opens Cypress in interactive mode. This is useful for debugging tests and running specs manually.

---
### Run All Tests

npm run cy:run

Runs all Cypress tests in headless mode using the default cypress.config.js.

---
### Run Tests With Staging Config

npm run cy:run:staging

Runs tests using cypress.staging.config.js.

---
### Run Tests In Chrome

npm run cy:run:chrome

Runs all tests in the Chrome browser.

---
### Run Tests In Firefox

npm run cy:run:firefox

Runs all tests in Firefox in headless mode.

---
### Run Tests In Edge

npm run cy:run:edge

Runs all .cy.js tests from the cypress/e2e folder in Microsoft Edge.

---
### Run And Record To Cypress Cloud

npm run cy:run:record

Runs tests and records the result to Cypress Cloud using the configured Cypress project.

---
### Run Staging Tests And Record To Cypress Cloud

npm run cy:run:staging:record

Runs tests with the staging config in Chrome and records the result to Cypress Cloud.

---
### Run Smoke Tests

npm run cy:run:smoke

Runs specs from cypress/e2e/smoke//*.cy.js.

---
### Run Regression Tests

npm run cy:run:regression

Runs specs from cypress/e2e/regression//*.cy.js.

---
### Run Tests With Longer Timeout

npm run cy:run:slow-mo

Runs tests with defaultCommandTimeout=10000. This is useful when the tested website loads dynamic content slowly.

---
### Run Tests Without Video And Screenshots

npm run cy:run:no-video

Runs tests with video recording disabled and screenshots on failure disabled.

---
### Clear Cypress Cache

npm run cy:clear:cache

Clears the Cypress cache and verifies the Cypress installation.

---
## Project Architecture & Design Patterns

To ensure high maintainability, readability, and scalability, this project utilizes the Page Object Model (POM) pattern combined with targeted Custom Cypress Commands.

### 1. Page Object Model (POM)

All UI elements (locators) and page-specific interactions are isolated within classes inside the cypress/pages/ directory. Web elements are mapped using dynamic JS get properties to prevent stale element exceptions and enable scannable test files.

The pages implemented are:

MainPage.js: Handles global navigation elements (header links, footer links), landing views, and chat operations.

SignUpPage.js: Handles interactions and input methods for the Telnyx Registration / Sign Up form.

ContactUsPage.js: Encapsulates elements and logic for the 'Talk to an expert' inquiry forms.

PricingPage.js: Contains elements for general rates and targeted product sheets like SIP Trunking.

CareersPage.js: Represents the recruiting page view and outbound application tracking connections.

---
### 2. Custom Cypress Commands

Global, shared, and infrastructure-level test steps that are cross-cutting across multiple functional views are stored in:

cypress/support/commands.js

Following best practices, these are strictly limited to core shared behaviors rather than unique page views:

cy.ignoreThirdPartyErrors(): Subdues uncaught exceptions stemming from global third-party analytical scripts.

cy.closeCookieBanner(): Closes the OneTrust cookie standard modal regardless of which landing spec receives it first.

cy.login(email, password): A shared programmatic session hook prepared for upcoming user-restricted verification routes.

---
### Example Refactored Test View Usage

import SignUpPage from '../pages/SignUpPage'

it('TC-08: Verifying validation error for a weak password during Sign Up', () => {
  cy.ignoreThirdPartyErrors()
  SignUpPage.open()
  
  SignUpPage.fillForm({
    email: `qa-${Date.now()}@example.com`,
    firstName: 'test1',
    lastName: 'test1',
    password: '12345',
  })
  SignUpPage.submitForm()
  SignUpPage.submit()

  SignUpPage.passwordErrorMessage.should('be.visible')
})

---
## Configuration

The project uses two Cypress configuration files:

cypress.config.js is the default production configuration.

cypress.staging.config.js is used for staging runs.

The default production config sets:

baseUrl: 'https://telnyx.com'

viewportWidth: 1920

viewportHeight: 1080

---
## CI/CD

GitHub Actions runs the main Cypress spec on every push, except pushes that only change README.md.

The workflow file is located at:

.github/workflows/cypress.yml

The CI pipeline executes:

cypress/e2e/telnyx_10_autotests.cy.js

and streams test results live to the Cypress Cloud Dashboard when the CYPRESS_RECORD_KEY pipeline secret is supplied.