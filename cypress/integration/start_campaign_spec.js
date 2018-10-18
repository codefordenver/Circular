describe('Starting a new campaign', () => {
  it('prompts the user with about recycling', () => {
    cy.visit('http://localhost:3000/how-does-this-work');
    cy.contains('NEED RECYCLING IN YOUR APARTMENT OR CONDO?');
    cy.contains('Recruit, Request, Recycle');
    cy.contains('Follow these easy steps!');
  });

  describe('When Searching an Address', () => {
    it('Should fill out search box and click search and visit choose campaign page', () => {
      cy.get('.search_input')
        .type('Denver')
        .should('have.value', 'Denver')
        .then(() => {
          cy.get('.search_button').click(() => {
            cy.visit('/choose-campaign');
          });
        });
    });
  });
});
