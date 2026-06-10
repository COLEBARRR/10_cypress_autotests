describe('Telnyx E2E Smoke Tests', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('TC-01: Verifying Telnyx main homepage loads successfully', () => {
    cy.get('header img[alt*="Telnyx"]').should('be.visible') //
  })

  it('TC-02: Verifying transition to "Contact Us" page via header link', () => {
    
    cy.get('header a[href*="/contact-us"]').first().click({ force: true }) //
    
    cy.url().should('include', '/contact-us') //
    cy.contains('h1', 'Talk to an expert').should('be.visible') //
    
    cy.get('form').should('be.visible')
    cy.get('button[type="submit"]', { timeout:15000 }).should('be.visible') //
  })

  it('TC-03: Verifying transition to "SIP Trunking" pricing page and "Download pricing" form', () => {
    
    cy.on('uncaught:exception', (err, runnable) => {
      return false 
    })

    cy.visit('/pricing/elastic-sip')
    
    
    cy.contains('Download pricing').scrollIntoView()

    cy.get('input#FirstName', { timeout: 15000 }).should('be.visible')
    
    
    cy.get('input#FirstName').type('John')
    cy.get('input#LastName').type('Doe')
    cy.get('input#Email').type('business@business.com')

    
    cy.get('button[type="submit"]').contains('Submit').click()
  })

  it('TC-04: Verifying error message when signing up with an invalid email address', () => {
    cy.visit('/sign-up')
    cy.url().should('include', '/sign-up') 

    
    cy.get('form input[type="email"]').first().as('emailInput')
    
    
    cy.get('@emailInput').type('test@') 

    
    cy.get('form button[type="submit"]').first().click({ force: true }) 

    
    cy.get('@emailInput').then(($input) => {
      expect($input[0].checkValidity()).to.be.false
      
      expect($input[0].validationMessage).to.not.be.empty
    })
  })

  it('TC-05: Verifying validation errors when submitting an empty Contact Us form', () => {
    
    cy.on('uncaught:exception', () => false)
    
    cy.visit('/contact-us') 
    cy.contains('h1', 'Talk to an expert').should('be.visible') 
    
    cy.get('form#mktoForm_1987', { timeout: 10000 }).should('be.visible')
    
    cy.get('form#mktoForm_1987 button[type="submit"]').click() 

    cy.get('form#mktoForm_1987 .mktoError').should('be.visible') 
  })

  it('TC-06: Verifying the "Pricing" page loads successfully', () => {
    cy.on('uncaught:exception', () => false) 

    cy.visit('/pricing')

    cy.url().should('include', '/pricing')
    
    cy.contains('h1', 'Pricing').should('be.visible')
    cy.contains('Communications').should('be.visible')

    cy.get('a[href*="/pricing/elastic-sip"]').contains('SIP Trunking').should('be.visible')
  })

  it('TC-07: Verifying that the "Careers" page loads successfully via footer link', () => {
    cy.on('uncaught:exception', () => false) 

    cy.get('footer a[href*="/careers"]').first().scrollIntoView().click({ force: true }) 

    cy.url().should('include', '/careers') 
    cy.contains('Come and work with us!').should('be.visible')

    cy.get('a[href*="greenhouse.io"]').should('have.length.greaterThan', 0)
  })

  it('TC-08: Verifying validation error for a weak password during Sign Up', () => {
    cy.on('uncaught:exception', () => false) 
    cy.visit('/sign-up')
    cy.url().should('include', '/sign-up')

    
    cy.get('#sign-up-email').should('be.visible').type(`qa-${Date.now()}@example.com`);
    cy.get('#sign-up-first-name').type('test1');
    cy.get('#sign-up-last-name').type('test1');
    cy.get('#sign-up-password').type('12345');
    cy.get('button[type="submit"]').contains(/SIGNUP/i).click();

    cy.get('form button[type="submit"]').first().click({ force: true })

    cy.contains('Password must').should('be.visible')
  })

  it('TC-09: Verifying "Chat to an Agent" basic functionality', () => {
    cy.on('uncaught:exception', () => false) 
    cy.contains('button', 'Kimi K2.5', { timeout: 30000 }).scrollIntoView().click()

    cy.get('input[placeholder="Type message here"]').should('be.visible').clear().type('Hi')

    cy.contains('button', 'SEND MESSAGE').click()

    cy.get('main', { timeout: 45000 })
      .should('satisfy', ($main) => {
        const text = $main.text().toLowerCase()
        return text.includes('hi') || text.includes('hello') || text.includes('help') || text.includes('assist')
      })
  })

 it('TC-10: Verifying cookie pop-up closure via Close button', () => {
    cy.on('uncaught:exception', () => false) 
    cy.clearCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    
    cy.visit('/') 

    cy.get('#onetrust-banner-sdk', { timeout: 15000 }).should('be.visible')

    cy.get('#onetrust-close-btn-container button')
      .should('be.visible')
      .click({ force: true })

    cy.get('#onetrust-banner-sdk').should('not.be.visible')
  })

})