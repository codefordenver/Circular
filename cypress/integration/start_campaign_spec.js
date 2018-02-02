describe('Starting a new campaign', () => {
  it('prompts the user with about recycling', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Need recycling at your building?');
  });

  describe('when searching an address', () => {
    it('navigates to the choose campaign page', () => {
      cy.visit('http://localhost:3000');
      cy
        .get('.search_input')
        .type('Denver')
        .should('have.value', 'Denver');
      cy.get('.search_button').click();
      cy.url().should('include', '/choose-campaign');
      cy.get('.btn').click();
      cy.url().should('include', 'new-campaign/address');
      cy.get('.form-control').should('have.value', 'Denver, CO, USA');
      cy
        .get('.form-control.campaign')
        .click()
        .type('My New Thing!');
      cy.get('.btn').click();
    });
  });
});
