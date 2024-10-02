// File: /cypress/integration/position/position_spec.js

describe('Position Page Tests', () => {
  
    // This hook runs before each test case
    beforeEach(() => {
      // Visit the position page (change the URL as needed)
      cy.visit('/positions');
    });
  
    it('should load the position page successfully', () => {
      // Check if the page header is visible
      cy.get('h1').should('contain.text', 'Available Positions');
  
      // Verify that the position table is loaded
      cy.get('table#position-table').should('be.visible');
  
      // Check if the 'Add Position' button is visible
      cy.get('button#add-position').should('be.visible').and('contain.text', 'Add Position');
    });
  });
// Continuation in the same file: /cypress/integration/position/position_spec.js

it('should successfully change candidate phase', () => {
    // Assuming there's a dropdown to change the phase of the candidate
    
    // Find the row of the candidate by their name or ID
    cy.get('tr[data-candidate-id="123"]').within(() => {
      // Click on the phase dropdown
      cy.get('select#phase-dropdown').select('Interview');
  
      // Verify that the phase has been updated (e.g., an API response or visual change)
      cy.get('td.phase-status').should('contain.text', 'Interview');
    });
  
    // Optionally, confirm that a success message appears
    cy.get('.notification.success').should('contain.text', 'Candidate phase updated successfully');
  });
    
