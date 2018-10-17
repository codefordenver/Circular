describe('The how does it work page', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000/how-does-this-work');
  });

  it('Shows first step on page load', () => {
    cy.get('.steps-content-container').then($el => {
      expect($el).to.have.css('left', '0px');
    });
  });

  describe('Clicking Step 1', () => {
    it('Sets left position of steps-content-container to make 1st step visible', () => {
      cy.get('.step-selector-0').click();
      cy.wait(700);
      cy.get('.steps-content-container').then($el => {
        expect($el).to.have.css('left', '0px');
      });
    });
  });

  describe('Clicking Step 2', () => {
    it('Sets left position of steps-content-container to make 2nd step visible', () => {
      cy.get('.step-selector-1').click();
      cy.wait(700);
      cy.get('.steps-content-container').then($el => {
        const width = $el.css('width');
        expect($el).to.have.css('left', '-' + width);
      });
    });
  });

  describe('Clicking Step 3', () => {
    it('Sets left position of steps-content-container to make 3rd step visible', () => {
      cy.get('.step-selector-2').click();
      cy.wait(700);
      cy.get('.steps-content-container').then($el => {
        let width = $el.css('width');
        width = parseInt(width) * 2;
        expect($el).to.have.css('left', '-' + width + 'px');
      });
    });
  });

  describe('Clicking Step 4', () => {
    it('Sets left position of steps-content-container to make 4th step visible', () => {
      cy.get('.step-selector-3').click();
      cy.wait(700);
      cy.get('.steps-content-container').then($el => {
        let width = $el.css('width');
        width = parseInt(width) * 3;
        expect($el).to.have.css('left', '-' + width + 'px');
      });
    });
  });
});
