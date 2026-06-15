class ContactUsPage {
  
  get form() { return cy.get('form#mktoForm_1987'); }
  get submitButton() { return cy.get('form#mktoForm_1987 button[type="submit"]'); }
  get errorMessages() { return cy.get('form#mktoForm_1987 .mktoError'); }
  get heading() { return cy.contains('h1', 'Talk to an expert'); }

  
  open() {
    cy.visit('/contact-us');
  }

  submitEmptyForm() {
    this.form.should('be.visible');
    this.submitButton.click();
  }
}

export default new ContactUsPage();