describe('The landing page', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });
  it('Prompts the user with about recycling', () => {
    cy.contains('NEED RECYCLING');
  });

  //NAVIGATION BAR
  describe('Navigation Bar', () => {
    describe('Home link', () => {
      it('Navigates to root page', () => {
        cy.contains('WHY').click();
        cy.contains('HOME').click();
        cy.url().should('include', 'http://localhost:3000');
      });
    });

    // WHY RECYCLE
    describe('Why Recycle link', () => {
      it('Navigates to the why recycle page', () => {
        cy.contains('WHY').click();
        cy.url().should('include', '/denver-learn-more');
      });
    });

    describe('Tools Dropdown', () => {
      // PROPERTY MANAGER LINKS
      describe('Property Manager Resources link', () => {
        it('Navigates to Property Manager Resources page', () => {
          cy.contains('TOOLS').click();
          cy.contains('Tips for Requesting').click();
          cy.url().should('include', '/tips-for-requesting');
          cy.contains('TOOLS').click();
          cy.contains('Property Manager Resources').click();
          cy.url().should('include', '/manager-resources');
        });
      });

      // TIPS FOR REQUESTING
      describe('Tips for Requesting link ', () => {
        it('Navigates to Tips for Requesting page', () => {
          cy.contains('TOOLS').click();
          cy.contains('Tips for Requesting').click();
          cy.url().should('include', '/tips-for-requesting');
        });
      });
      
      // WHO WE ARE LINK
      describe('Who Are We link', () => {
        it('Navigates to Who Are We page', () => {
          cy.contains('WHO WE ARE').click();
          cy.url().should('include', '/who-are-we');
        });
      });

      // WILL NEED TO ADDRESS CORS ISSUES TO TEST AUTH
      describe('Check login navigation toggle', () => {
        it('Opens Dropdown Toggles to Login', () => {
          cy.contains('LOGIN').click();
          cy.contains('Sign in With Facebook');
          cy.contains('Sign in With Google');
        });
      });
    });
  });

  //FOOTER
  describe('Footer', () => {
    describe('Privacy Policy', () => {
      it('Navigates to Privacy Policy', () => {
        cy.contains('Privacy Policy').click();
        cy.url().should('include', '/privacy-policy');
      });
    });
  });
});
