class MainPage {
  
  get logo() { return cy.get('header img[alt*="Telnyx"]'); }
  get headerContactUsLink() { return cy.get('header a[href*="/contact-us"]').first(); }
  get footerCareersLink() { return cy.get('footer a[href*="/careers"]').first(); }
  get chatKimiButton() { return cy.contains('button', 'Kimi K2.5', { timeout: 30000 }); }
  get chatInput() { return cy.get('input[placeholder="Type message here"]'); }
  get chatSendButton() { return cy.contains('button', 'SEND MESSAGE'); }
  get chatMainContent() { return cy.get('main', { timeout: 45000 }); }

  
  open() {
    cy.visit('/');
  }

  openContactUs() {
    this.headerContactUsLink.click({ force: true });
    cy.url().should('include', '/contact-us');
    cy.contains('h1', 'Talk to an expert').should('be.visible');
  }

  openCareers() {
    this.footerCareersLink.scrollIntoView().click({ force: true });
    cy.url().should('include', '/careers');
  }

  sendChatMessage(message) {
    this.chatKimiButton.scrollIntoView().click();
    this.chatInput.should('be.visible').clear().type(message);
    this.chatSendButton.click();
  }
}

export default new MainPage();