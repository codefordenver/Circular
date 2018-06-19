describe('The denver learn more page', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000/denver-learn-more');
  });

  describe('Why Recycle? toggle panel', () => {
    it('Toggles panel', () => {
      cy
        .get('.text-black.panel-body')
        .contains('Recycling is known')
        .should('not.be.visible');
      cy
        .get('a.collapse-panel-toggle')
        .contains('Why Recycle?')
        .click();
      cy
        .get('.text-black.panel-body')
        .contains('Recycling is known')
        .should('be.visible');
    });
  });

  it('Should have link to "ecocycle"', () => {
    cy
      .get('a.info-link')
      .should('have.attr', 'href', 'http://ecocycle.org/take-action/denver');
  });
});
