describe('Cambio de Fase de un Candidato', () => {
    it('Debe mover la tarjeta de Jane Smith a Manager Interview y actualizar el backend', () => {
      // Interceptar la solicitud PUT al backend
      cy.intercept('PUT', '/candidates/*').as('updateCandidateStage');
  
      // Visitar la página de detalles de la posición
      cy.visit('http://localhost:3000/positions/1');
  
      // Asegurarse de que la columna "Technical Interview" está visible
      cy.contains('.card-header', 'Technical Interview').should('be.visible');
  
      // Asegurarse de que la columna "Manager Interview" está visible
      cy.contains('.card-header', 'Manager Interview').should('be.visible');
  
      // Obtener la tarjeta de "Jane Smith"
      cy.contains('.card-title', 'Jane Smith')
        .closest('.card')
        .as('janeCard');
  
      // Obtener la columna "Manager Interview"
      cy.contains('.card-header', 'Manager Interview')
        .closest('.card')
        .as('managerInterviewColumn');
  
      // Realizar el arrastre de "Jane Smith" a "Manager Interview"
      cy.get('@janeCard').drag('@managerInterviewColumn');
  
      // Verificar que la tarjeta ahora está dentro de la columna "Manager Interview"
      cy.get('@managerInterviewColumn')
        .find('.card-title')
        .should('contain', 'Jane Smith');
  
      // Esperar la solicitud PUT y verificar los datos enviados
      cy.wait('@updateCandidateStage').then((interception) => {
        const { body } = interception.request;
        expect(body.applicationId).to.equal(3);
        expect(body.currentInterviewStep).to.equal(3);
      });
  
      // Opcional: Verificar que se muestra un mensaje de éxito o se actualiza la UI correctamente
    //   cy.contains('Jane Smith').parent().should('have.class', 'new-stage-class'); // Reemplaza 'new-stage-class' con la clase real
    });
  });