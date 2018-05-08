describe('Starting a new campaign', () => {
  it('prompts the user with about recycling', () => {
    cy.visit('http://localhost:3000');
    cy.contains('NEED RECYCLING');
    cy.contains('-in-');
    cy.contains('YOUR BUILDING?');
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
    });
  });
});
