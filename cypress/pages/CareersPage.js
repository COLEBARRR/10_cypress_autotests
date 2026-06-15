class CareersPage {
  
  get heading() { return cy.contains('Come and work with us!'); }
  get greenhouseLinks() { return cy.get('a[href*="greenhouse.io"]'); }
}

export default new CareersPage();