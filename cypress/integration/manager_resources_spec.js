describe('The manager resources page', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000/manager-resources');
  });

  describe('Manager resources', () => {
    it('Should default with Tips for Purchasing expanded', () => {
      cy
        .get('a.collapse-panel-toggle')
        .contains('Tips for Purchasing Service')
        .get('div.text-black.panel-body')
        .should('be.visible');
    });
  });
});
