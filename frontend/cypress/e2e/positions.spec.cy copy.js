describe('Positions Page', () => {
  beforeEach(() => {
    cy.visit('/positions', { timeout: 10000 });
  });

  it('should display the correct title for positions', () => {
    // Extend the timeout limit by 5 seconds
    cy.get('h2', { timeout: 10000 }).should('exist');

    cy.get('h2').should('contain', 'Posiciones');
          
    cy.get('[data-testid="position-link"]').first().invoke('text').then((linkText) => {
      const positionTitle = linkText.trim();
      
      cy.get('[data-testid="position-link"]').first().click();

      // Wait for the new page to load
      cy.url({ timeout: 10000 }).should('include', '/positions/');
      
      // Check if the position details page shows the correct title
      cy.get('h2').should('contain', positionTitle);
    });
  });
});