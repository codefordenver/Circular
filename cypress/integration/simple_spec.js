describe('The landing page', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  it('prompts the user with about recycling', () => {
    cy.contains('Need recycling at your building?')
  })

  describe('when searching an address', () => {
    it('navigates to the choose campaign page', () => {
      cy.get('.search_input')
        .type('Denver')
        .should('have.value', 'Denver')
      cy.get('.search_button')
        .click()
      cy.url().should('include', '/choose-campaign')
    })
  })
})
