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
      cy.get('.steps-content-container').then($el => {
        expect($el).to.have.css('left', '0px');
      });
    });

    it('Shows disabled previous button', () => {
      cy.get('.step-selector-0').click();
      cy.get('.step-button.prev')
        .should('have.class', 'disabled')
        .then($el => {
          expect($el).to.have.css('opacity', '0.3');
          expect($el).to.have.css('cursor', 'default');
        });
    });

    it('Shows enabled next button', () => {
      cy.get('.step-selector-0').click();
      cy.get('.step-button.next')
        .should('not.have.class', 'disabled')
        .then($el => {
          expect($el).to.have.css('opacity', '0.8');
          expect($el).to.have.css('cursor', 'pointer');
        });
    });
  });

  describe('Clicking Step 2', () => {
    it('Sets left position of steps-content-container to make 2nd step visible', () => {
      cy.get('.step-selector-1').click();
      cy.get('.steps-content-container').then($el => {
        const width = $el.css('width');
        console.log(width);
        expect($el).to.have.css('left', '-' + width);
      });
    });

    it('Shows enabled next and previous buttons', () => {
      cy.get('.step-selector-1').click();
      cy.get('.step-button.next')
        .should('not.have.class', 'disabled')
        .then($el => {
          expect($el).to.have.css('opacity', '0.8');
          expect($el).to.have.css('cursor', 'pointer');
        });
      cy.get('.step-button.prev')
        .should('not.have.class', 'disabled')
        .then($el => {
          expect($el).to.have.css('opacity', '0.8');
          expect($el).to.have.css('cursor', 'pointer');
        });
    });
  });

  describe('Clicking Step 3', () => {
    it('Sets left position of steps-content-container to make 3rd step visible', () => {
      cy.get('.step-selector-2').click();
      cy.get('.steps-content-container').then($el => {
        let width = $el.css('width');
        width = parseInt(width) * 2;
        console.log(width);
        expect($el).to.have.css('left', '-' + width + 'px');
      });
    });

    it('Shows enabled next and previous buttons', () => {
      cy.get('.step-selector-2').click();
      cy.get('.step-button.next')
        .should('not.have.class', 'disabled')
        .then($el => {
          expect($el).to.have.css('opacity', '0.8');
          expect($el).to.have.css('cursor', 'pointer');
        });
      cy.get('.step-button.prev')
        .should('not.have.class', 'disabled')
        .then($el => {
          expect($el).to.have.css('opacity', '0.8');
          expect($el).to.have.css('cursor', 'pointer');
        });
    });
  });

  describe('Clicking Step 4', () => {
    it('Sets left position of steps-content-container to make 4th step visible', () => {
      cy.get('.step-selector-3').click();
      cy.get('.steps-content-container').then($el => {
        let width = $el.css('width');
        width = parseInt(width) * 3;
        console.log(width);
        expect($el).to.have.css('left', '-' + width + 'px');
      });
    });

    it('Shows disabled next button', () => {
      cy.get('.step-selector-3').click();
      cy.get('.step-button.next')
        .should('have.class', 'disabled')
        .then($el => {
          expect($el).to.have.css('opacity', '0.3');
          expect($el).to.have.css('cursor', 'default');
        });
    });

    it('Shows enabled previous button', () => {
      cy.get('.step-selector-3').click();
      cy.get('.step-button.prev')
        .should('not.have.class', 'disabled')
        .then($el => {
          expect($el).to.have.css('opacity', '0.8');
          expect($el).to.have.css('cursor', 'pointer');
        });
    });
  });
});
