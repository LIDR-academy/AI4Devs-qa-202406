describe('Position Details Page', () => {
  beforeEach(() => {
    // Assuming we have a position with ID 1
    cy.visit('http://localhost:3000/positions/1');
  });

  it('should display the position title correctly', () => {
    cy.get('h2.text-center').should('exist').and('not.be.empty');
  });

  it('should display columns for each interview step', () => {
    cy.get('.row > div').should('have.length.at.least', 2);
    cy.get('.card-header').each(($header) => {
      cy.wrap($header).should('not.be.empty');
    });
  });

  it('should display candidate cards in the correct columns', () => {
    cy.get('.row > div').each(($column) => {
      cy.wrap($column).within(() => {
        cy.get('.stage-card-body').then(($stageCardBody) => {
          if ($stageCardBody.find('.candidate-card-body').length > 0) {
            cy.wrap($stageCardBody).within(() => {
              cy.get('.candidate-card-body').then(($candidateCard) => {
                cy.wrap($candidateCard).find('.candidate-card-title').should('exist').and('not.be.empty');
                cy.wrap($candidateCard).find('.candidate-card-rating').should('exist');
              });
            });
          } else {
            cy.log('No candidates in this column');
          }
        });
      });
    });
  });
});
