describe('The landing page', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });
  it('prompts the user with about recycling', () => {
    cy.contains('NEED RECYCLING');
  });

  describe('when searching an address', () => {
    it('navigates to the choose campaign page', () => {
      cy
        .get('.search_input')
        .type('Denver')
        .should('have.value', 'Denver');
      cy.get('.search_button').click();
      cy.url().should('include', '/choose-campaign');
    });
  });

  describe('Home link', () => {
    it('navigates to root page', () => {
      cy.contains('Why Recycle').click();
      cy.contains('HOME').click();
      cy.url().should('include', 'http://localhost:3000');
    });
  });

  describe('Why Recycle link', () => {
    it('navigates to the why recycle page', () => {
      cy.contains('Why Recycle').click();
      cy.url().should('include', '/denver-learn-more');
    });
  });

  describe('Property Manager Resources link within Tools dropdown', () => {
    it('navigates to Property Manager Resources page', () => {
      cy.contains('Tools').click();
      cy.contains('Property Manager Resources').click();
      cy.url().should('include', '/manager-resources');
    });
  });
});
