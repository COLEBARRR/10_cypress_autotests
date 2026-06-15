import MainPage from '../pages/MainPage'
import SignUpPage from '../pages/SignUpPage'
import ContactUsPage from '../pages/ContactUsPage'
import PricingPage from '../pages/PricingPage'
import CareersPage from '../pages/CareersPage'

describe('Telnyx E2E Smoke Tests (POM)', () => {

  beforeEach(() => {
    MainPage.open()
  })

  it('TC-01: Verifying Telnyx main homepage loads successfully', () => {
    MainPage.logo.should('be.visible')
  })

  it('TC-02: Verifying transition to "Contact Us" page via header link', () => {
    MainPage.openContactUs()
    
    ContactUsPage.form.should('be.visible')
    ContactUsPage.submitButton.should('be.visible')
  })

  it('TC-03: Verifying transition to "SIP Trunking" pricing page and "Download pricing" form', () => {
    cy.ignoreThirdPartyErrors() 
    PricingPage.openElasticSip()

    PricingPage.fillDownloadForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'business@business.com',
    })
    PricingPage.submitDownloadForm()
  })

  it('TC-04: Verifying error message when signing up with an invalid email address', () => {
    SignUpPage.open()
    cy.url().should('include', '/sign-up') 

    SignUpPage.fillEmail('test@')
    SignUpPage.submit()

    SignUpPage.emailInput.then(($input) => {
      expect($input[0].checkValidity()).to.be.false
      expect($input[0].validationMessage).to.not.be.empty
    })
  })

  it('TC-05: Verifying validation errors when submitting an empty Contact Us form', () => {
    cy.ignoreThirdPartyErrors()
    ContactUsPage.open() 
    ContactUsPage.heading.should('be.visible') 
    
    ContactUsPage.submitEmptyForm()
    ContactUsPage.errorMessages.should('be.visible')
  })

  it('TC-06: Verifying the "Pricing" page loads successfully', () => {
    cy.ignoreThirdPartyErrors()
    PricingPage.open()

    cy.url().should('include', '/pricing')
    PricingPage.heading.should('be.visible')
    PricingPage.communicationsSection.should('be.visible')
    PricingPage.sipTrunkingLink.should('be.visible')
  })

  it('TC-07: Verifying that the "Careers" page loads successfully via footer link', () => {
    cy.ignoreThirdPartyErrors()
    MainPage.openCareers()

    CareersPage.heading.should('be.visible')
    CareersPage.greenhouseLinks.should('have.length.greaterThan', 0)
  })

  it('TC-08: Verifying validation error for a weak password during Sign Up', () => {
    cy.ignoreThirdPartyErrors()
    SignUpPage.open()
    cy.url().should('include', '/sign-up')

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

  it('TC-09: Verifying "Chat to an Agent" basic functionality', () => {
    cy.ignoreThirdPartyErrors()
    MainPage.sendChatMessage('Hi')

    MainPage.chatMainContent.should('satisfy', ($main) => {
      const text = $main.text().toLowerCase()
      return text.includes('hi') || text.includes('hello') || text.includes('help') || text.includes('assist')
    })
  })

  it('TC-10: Verifying cookie pop-up closure via Close button', () => {
    cy.ignoreThirdPartyErrors()
    cy.clearCookies()
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    
    MainPage.open() 
    cy.closeCookieBanner()
  })
})