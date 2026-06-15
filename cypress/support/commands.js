// Custom Cypress commands for repeated Telnyx test actions.
// They are available in specs as cy.commandName(...).

// 1. Глобальный игнор ошибок сторонних скриптов
Cypress.Commands.add('ignoreThirdPartyErrors', () => {
  cy.on('uncaught:exception', () => false)
})

// 2. Глобальный куки-баннер
Cypress.Commands.add('closeCookieBanner', () => {
  cy.get('#onetrust-banner-sdk', { timeout: 15000 }).should('be.visible')
  
  
  cy.get('#onetrust-close-btn-container button', { timeout: 15000 })
    .should('be.visible')
    .click({ force: true })
    
  cy.get('#onetrust-banner-sdk').should('not.be.visible')
})

// 3. Глобальный метод авторизации для будущих тестов
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('input[type="email"]').should('be.visible').type(email)
  cy.get('input[type="password"]').should('be.visible').type(password)
  cy.get('button[type="submit"]').click()
})