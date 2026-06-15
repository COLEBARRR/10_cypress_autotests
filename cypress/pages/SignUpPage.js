class SignUpPage {
  
  get emailInput() { return cy.get('form input[type="email"]').first(); }
  get submitButton() { return cy.get('form button[type="submit"]').first(); }
  get signUpEmailInput() { return cy.get('#sign-up-email'); }
  get signUpFirstNameInput() { return cy.get('#sign-up-first-name'); }
  get signUpLastNameInput() { return cy.get('#sign-up-last-name'); }
  get signUpPasswordInput() { return cy.get('#sign-up-password'); }
  get passwordErrorMessage() { return cy.contains('Password must'); }

  
  open() {
    cy.visit('/sign-up');
  }

  fillEmail(email) {
    this.emailInput.type(email);
  }

  submit() {
    this.submitButton.click({ force: true });
  }

  fillForm({ email, firstName, lastName, password }) {
    this.signUpEmailInput.should('be.visible').type(email);
    this.signUpFirstNameInput.type(firstName);
    this.signUpLastNameInput.type(lastName);
    this.signUpPasswordInput.type(password);
  }

  submitForm() {
    cy.get('button[type="submit"]').contains(/SIGNUP/i).click();
  }
}

export default new SignUpPage();