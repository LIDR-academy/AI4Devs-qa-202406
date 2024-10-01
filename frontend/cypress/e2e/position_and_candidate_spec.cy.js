describe('Position Page and Candidate Changes', () => {
    beforeEach(() => {
      cy.visit('/positions');
    });
  
    it('should navigate to the Positions page', () => {
      cy.get('h2').should('contain', 'Posiciones');
    });
  
    it('should navigate to a specific position', () => {
      cy.get('.position-link').first().click();
      cy.url().should('include', '/positions/');
      cy.get('h2').should('exist');
    });
  
    it('should display candidate cards', () => {
      cy.get('.position-link').first().click();
      cy.get('[data-testid="candidate-card"]').should('exist');
    });
  
    it('should open candidate details when clicking on a card', () => {
      cy.get('.position-link').first().click();
      cy.get('[data-testid="candidate-card"]').first().click();
      cy.get('.offcanvas-title').should('contain', 'Detalles del Candidato');
    });
  
    // We'll add the drag-and-drop test later
  });