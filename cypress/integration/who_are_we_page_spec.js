describe('The who are we page', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000/who-are-we');
  });
  it('Prompts the user with who are we', () => {
    cy.contains('Who Are We');
  });

  describe('Code for Denver link', () => {
    it('Navigates to the Code for Denver website', () => {
      cy.get('a')
        .contains('Code For Denver')
        .should('have.attr', 'href', 'https://www.codefordenver.org/');
    });
  });

  describe('Eco-Cycle link', () => {
    it('Navigates to the Eco Cycle website', () => {
      cy.get('a')
        .contains('Eco-Cycle')
        .should('have.attr', 'href', 'https://www.ecocycle.org');
    });
  });
});
