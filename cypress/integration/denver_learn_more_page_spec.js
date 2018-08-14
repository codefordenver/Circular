describe('The denver learn more page', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000/denver-learn-more');
  });

  describe('Why Recycle? toggle panel', () => {
    it('Toggles panel', () => {
      cy.get('a.collapse-panel-toggle')
        .contains('Why Recycle?')
        .click();
      cy.get('div.text-black.panel-body').should('be.visible');
    });
  });
});
