describe('Candidate Stage Change', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/positions/1');
      cy.get('h2.text-center.mb-4', { timeout: 10000 }).should('be.visible');
    });
  
    it('should move a candidate card to a new column and update the backend', () => {
      // Locate Jane Smith's card in the Technical Interview column
      cy.contains('.col-md-3', 'Technical Interview')
        .find('.card-title')
        .contains('Jane Smith')
        .closest('.card')
        .as('janeSmithCard');
  
      // Locate the Manager Interview column
      cy.contains('.col-md-3', 'Manager Interview')
        .as('managerInterviewColumn');
  
      // Log the Manager Interview column details
      cy.get('@managerInterviewColumn').then($column => {
        const rect = $column[0].getBoundingClientRect();
        cy.log('Manager Interview Column:', {
          element: $column[0].outerHTML,
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        });
      });
      cy.intercept('PUT', '/candidates/*').as('updateCandidate');
  
      // Perform drag and drop
    //   cy.get('@janeSmithCard').then($card => {
    //     const cardRect = $card[0].getBoundingClientRect();
    //     const startX = cardRect.left + cardRect.width / 2;
    //     const startY = cardRect.top + cardRect.height / 2;
  
    //     cy.get('@managerInterviewColumn').then($column => {
    //       const colRect = $column[0].getBoundingClientRect();
    //       const endX = colRect.left + colRect.width / 2;
    //       const endY = colRect.top + colRect.height / 2;
  
    //       cy.log('Drag coordinates:', { startX, startY, endX, endY });
  
    //       cy.get('@janeSmithCard')
    //         .trigger('mousedown', { which: 1, clientX: startX, clientY: startY })
    //         .trigger('mousemove', { clientX: endX, clientY: endY, force: true })
    //         .trigger('mouseup', { force: true });
  
    //       cy.log('Drag operation completed');
    //     });
    //   });
      cy.window().then((win) => {
        win.updateCandidatePosition('2', 1, 2); // Assuming Jane Smith's id is '2', moving from index 1 to 2
      });
  
      // Wait for potential animations or state updates
      cy.wait(1000);
  
      // Verify that the card has moved to the new column
      cy.get('@managerInterviewColumn').within(() => {
        cy.get('.card-title').should('contain', 'Jane Smith');
      });
  
      // Verify that the backend was updated correctly
      cy.wait('@updateCandidate').then((interception) => {
        expect(interception.request.body).to.deep.equal({
          applicationId: 2, // Assuming Jane Smith's application ID is 2
          currentInterviewStep: 3 // Assuming Manager Interview step ID is 3
        });
        expect(interception.response.statusCode).to.equal(200);
      });
    });
  });