describe('Positions Page', () => {
  beforeEach(() => {
    cy.visit('/positions', { timeout: 10000 });
  });

  it('should display the correct title for positions', () => {
    // Extend the timeout limit by 5 seconds
    cy.get('h2', { timeout: 10000 }).should('exist');

    cy.get('[data-testid="position-link"]').first().invoke('text').then((linkText) => {
      cy.get('[data-testid="position-link"]').first().click();
      
      // Wait for the new page to load
      cy.url({ timeout: 10000 }).should('include', '/positions/');
      
      // Check if the position details page shows the correct title
      cy.get('h2', { timeout: 10000 }).should('exist');
    });

    cy.get('h2').first().invoke('text').then((text) => {
      const positionTitle = text.trim();
      cy.get('[data-testid="position-title"]').should('contain', positionTitle);
    });
  });

  it('should display columns for each phase of the contracting process', () => {
    cy.get('[data-testid="position-link"]').first().click();
    
    // Wait for the new page to load
    cy.url({ timeout: 10000 }).should('include', '/positions/');
    
    // Check if the stage columns are present
    cy.get('.card-header').should('have.length.at.least', 3);
    
    // Verify the content of each column
    cy.get('.card-header').each(($header) => {
      cy.wrap($header).invoke('text').should('not.be.empty');
    });
  });

  it('should display candidate cards in the correct column according to their current phase', () => {
    cy.get('[data-testid="position-link"]').first().click();
    
    // Wait for the new page to load
    cy.url({ timeout: 10000 }).should('include', '/positions/');
    
    // Wait for the stage columns to be present
    cy.get('.card-header', { timeout: 10000 }).should('have.length.at.least', 3);
    
    // Check if the stage columns are present and contain candidate cards
    cy.get('.card-header').each(($header, index) => {
      cy.wrap($header).invoke('text').then((columnTitle) => {
        cy.get(`.card:eq(${index}) [data-testid="candidate-card"]`).then($cards => {
          if ($cards.length > 0) {
            cy.wrap($cards).first().find('.card-text').should('contain', columnTitle);
          } else {
            cy.log(`No candidate cards found in column "${columnTitle}"`);
          }
        });
      });
    });
  });
});