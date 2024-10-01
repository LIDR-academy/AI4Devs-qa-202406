describe('Carga de la Página de Position', () => {
    context('Posición: Senior Full-Stack Engineer', () => {
        const positionId = '1'; // ID de 'Senior Full-Stack Engineer'
        const expectedTitle = 'Senior Full-Stack Engineer';
        const urlBase = 'http://localhost:3000';

        beforeEach(() => {
            // Resetear la base de datos antes de cada prueba
            cy.request('POST', 'http://localhost:3010/test/reset');
        });

        it('Debe mostrar el título de la posición correctamente', () => {
            // Navegar a la página de detalles de la posición
            cy.visit(`${urlBase}/positions/${positionId}`);
            // Esperar a que el elemento del título esté visible
            cy.get('[data-cy=position-title]')
                .should('be.visible')
                .and('have.text', expectedTitle);
        });

        it('Debe mostrar las columnas correspondientes a cada fase del proceso de contratación', () => {
            const expectedColumns = ['Initial Screening', 'Technical Interview', 'Manager Interview'];

            // Navegar a la página de detalles de la posición
            cy.visit(`${urlBase}/positions/${positionId}`);

            // Verificar que cada columna esperada está presente y visible
            expectedColumns.forEach(column => {
                cy.contains('[data-cy=interview-phase-column]', column)
                    .should('be.visible');
            });
        });

        it('Debe mostrar las tarjetas de los candidatos en la columna correcta según su fase actual', () => {
            const candidatos = [
                { fullName: 'John Doe', currentInterviewStep: 'Technical Interview' },
                { fullName: 'Jane Smith', currentInterviewStep: 'Technical Interview' },
                { fullName: 'Carlos García', currentInterviewStep: 'Initial Screening' }
            ];

            // Navegar a la página de detalles de la posición
            cy.visit(`${urlBase}/positions/${positionId}`);

            // Verificar que cada tarjeta de candidato está en la columna correcta
            candidatos.forEach(candidato => {
                cy.contains('[data-cy=candidate-card]', candidato.fullName)
                    .should('be.visible')
                    .parents('[data-cy=interview-phase-column]')
                    .should('contain.text', candidato.currentInterviewStep);
            });
        });

        // Escenario 2: Cambio de Fase de un Candidato
        context('Escenario: Cambio de Fase de un Candidato', () => {
            const candidatoParaMover = { id: 3, fullName: 'Carlos García', currentInterviewStep: 'Initial Screening' };
            const nuevaFase = 'Technical Interview';

            beforeEach(() => {
                // Interceptar la petición PUT al backend
                cy.intercept('PUT', `/candidates/${candidatoParaMover.id}`).as('updateCandidateStage');

                // Resetear la base de datos antes de cada prueba
                cy.request('POST', 'http://localhost:3010/test/reset');

                // Navegar a la página de detalles de la posición
                cy.visit(`${urlBase}/positions/${positionId}`);
            });

            Cypress.Commands.add('getElementPosition', (element) => {
                cy.get(element).then(($el1) => {
                    const rect = $el1[0].getBoundingClientRect();

                    const posX = rect.left;
                    const posY = rect.top;

                    return { posX, posY };
                });
            });

            Cypress.Commands.add('realDragAndDrop', (subject, target) => {
                cy.get(subject).realMouseDown()
                    .getElementPosition(target).then(({ posX, posY }) => {
                        cy.get('body').realMouseMove(posX, posY);
                        cy.get(target).realMouseUp();
                    });
            });

            Cypress.Commands.add('dragAndDrop', (subject, target) => {
                const dataTransfer = new DataTransfer();
                debugger
                cy.get(subject)
                  .trigger('dragStart', {
                    "draggableId": "3",
                    "type": "DEFAULT",
                    "source": {
                        "index": 0,
                        "droppableId": "0"
                    },
                    "mode": "FLUID"
                })
                cy.get(target).trigger('dragEnd', {
                    "draggableId": "3",
                    "type": "DEFAULT",
                    "source": {
                        "index": 0,
                        "droppableId": "0"
                    },
                    "reason": "DROP",
                    "mode": "FLUID",
                    "destination": {
                        "index": 0,
                        "droppableId": "1"
                    },
                    "combine": null
                });
            });

            it('Debe simular el arrastre de una tarjeta de candidato de una columna a otra', () => {
                // Seleccionar la tarjeta del candidato
                cy.contains('[data-cy=candidate-card]', candidatoParaMover.fullName)
                    .should('be.visible')
                    .realDragAndDrop(`[data-cy=candidate-card]:contains("${candidatoParaMover.fullName}")`, `[data-cy=interview-phase-column]:contains("${nuevaFase}")`);

                cy.wait(500);
                // Esperar a que se complete la petición PUT
                cy.wait('@updateCandidateStage', { timeout: 10000 }).its('request.body').should('include', {
                    currentInterviewStep: 2
                });
            });

            it('Debe verificar que la tarjeta del candidato se mueve a la nueva columna', () => {
                // Simular el arrastre y soltar utilizando el plugin
                cy.contains('[data-cy=candidate-card]', candidatoParaMover.fullName)
                    .should('be.visible')
                    .dragAndDrop(`[data-cy=candidate-card]:contains("${candidatoParaMover.fullName}")`, `[data-cy=interview-phase-column]:contains("${nuevaFase}")`);

                // Verificar que la tarjeta ya no está en la columna de origen
                cy.contains('[data-cy=interview-phase-column]', candidatoParaMover.currentInterviewStep)
                    .should('not.contain.text', candidatoParaMover.fullName);

                // Verificar que la tarjeta está en la columna de destino
                cy.contains('[data-cy=interview-phase-column]', nuevaFase)
                    .should('contain.text', candidatoParaMover.fullName);
            });

            it('Debe verificar que la fase del candidato se actualiza correctamente en el backend', () => {
                // Simular el arrastre y soltar utilizando el plugin
                cy.contains('[data-cy=candidate-card]', candidatoParaMover.fullName)
                    .should('be.visible')
                    .dragAndDrop(`[data-cy=candidate-card]:contains("${candidatoParaMover.fullName}")`, `[data-cy=interview-phase-column]:contains("${nuevaFase}")`);

                // Esperar a que se complete la petición PUT
                cy.wait('@updateCandidateStage').then(({ request, response }) => {
                    // Verificar que la petición PUT contiene los datos correctos
                    expect(request.method).to.eq('PUT');
                    expect(request.url).to.include(`/candidates/${candidatoParaMover.id}`);
                    expect(request.body).to.have.property('currentInterviewStep', 2);

                    // Verificar que la respuesta es exitosa
                    expect(response.statusCode).to.eq(200);
                    expect(response.body).to.have.property('message', 'Candidate stage updated successfully');
                    expect(response.body.data).to.have.property('currentInterviewStep', 2);
                });
            });
        });
    });
});