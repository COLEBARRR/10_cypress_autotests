class PricingPage {
  
  get heading() { return cy.contains('h1', 'Pricing'); }
  get communicationsSection() { return cy.contains('Communications'); }
  get sipTrunkingLink() { return cy.get('a[href*="/pricing/elastic-sip"]').contains('SIP Trunking'); }
  get downloadSection() { return cy.contains('Download pricing'); }
  get firstNameInput() { return cy.get('input#FirstName'); }
  get lastNameInput() { return cy.get('input#LastName'); }
  get emailInput() { return cy.get('input#Email'); }
  get submitButton() { return cy.get('button[type="submit"]').contains('Submit'); }

  
  open() {
    cy.visit('/pricing');
  }

  openElasticSip() {
    cy.visit('/pricing/elastic-sip');
  }

  fillDownloadForm({ firstName, lastName, email }) {
  this.downloadSection.scrollIntoView();
  
  cy.get('input#FirstName', { timeout: 15000 })
    .should('be.visible')
    .type(firstName);
    
  this.lastNameInput.type(lastName);
  this.emailInput.type(email);
  }

  submitDownloadForm() {
    this.submitButton.click();
  }
}

export default new PricingPage();