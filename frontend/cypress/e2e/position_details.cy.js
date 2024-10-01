describe('Position Details Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/positions/1');
    cy.get('h2.text-center.mb-4', { timeout: 10000 }).should('be.visible');
  });

  it('displays the correct position title', () => {
    cy.get('h2.text-center.mb-4').should('contain', 'Senior Full-Stack Engineer');
  });

  it('displays the correct interview stages', () => {
    cy.get('.card-header', { timeout: 10000 }).should('have.length', 3);
    cy.get('.card-header').eq(0).should('contain', 'Initial Screening');
    cy.get('.card-header').eq(1).should('contain', 'Technical Interview');
    cy.get('.card-header').eq(2).should('contain', 'Manager Interview');
  });

  it('displays candidates in the correct columns', () => {
    // Wait for the columns to be visible
    cy.get('.col-md-3', { timeout: 10000 }).should('have.length', 3);

    // Check Initial Screening column
    cy.get('.col-md-3').eq(0).within(() => {
      cy.get('.card-header').should('contain', 'Initial Screening');
      cy.get('.card-body .card').should('have.length', 1);
    });

    // Check Technical Interview column
    cy.get('.col-md-3').eq(1).within(() => {
      cy.get('.card-header').should('contain', 'Technical Interview');
      cy.get('.card-body .card').should('have.length', 2);
    });

    // Check Manager Interview column
    cy.get('.col-md-3').eq(2).within(() => {
      cy.get('.card-header').should('contain', 'Manager Interview');
      cy.get('.card-body .card').should('have.length', 0);
    });
  });

  it('displays candidate names correctly', () => {
    cy.get('.col-md-3').eq(0).find('.card-title').should('contain', 'Carlos García');
    cy.get('.col-md-3').eq(1).find('.card-title').eq(0).should('contain', 'John Doe');
    cy.get('.col-md-3').eq(1).find('.card-title').eq(1).should('contain', 'Jane Smith');
  });

  it('displays candidate ratings correctly', () => {
    cy.get('.col-md-3').eq(1).within(() => {
      cy.contains('.card-title', 'John Doe')
        .closest('.card-body')
        .find('[role="img"]')
        .should('have.length', 5);

      cy.contains('.card-title', 'Jane Smith')
        .closest('.card-body')
        .find('[role="img"]')
        .should('have.length', 4);
    });
  });
});
