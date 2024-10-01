import 'cypress-drag-drop';

describe("Position Details Page", () => {
  it("should display the correct interview stages", () => {
    // Hacer una solicitud al backend para obtener los datos del flujo de entrevistas
    cy.request("http://localhost:3010/positions/1/interviewFlow").then(
      (response) => {
        // Verificar que la solicitud fue exitosa
        expect(response.status).to.eq(200);

        // Obtener los datos del flujo de entrevistas
        const interviewFlow = response.body.interviewFlow.interviewFlow;

        // Visitar la página de detalles de la posición en el frontend
        cy.visit("http://localhost:3000/positions/1");

        // Verificar que cada etapa de la entrevista se muestra correctamente
        interviewFlow.interviewSteps.forEach((step) => {
          cy.contains("div.card-header", step.name).should("be.visible");
        });
      }
    );
  });

  it("should display candidates in the correct interview stage columns", () => {
    // Hacer una solicitud al backend para obtener los datos de los candidatos
    cy.request("http://localhost:3010/positions/1/candidates").then(
      (response) => {
        // Verificar que la solicitud fue exitosa
        expect(response.status).to.eq(200);

        // Obtener los datos de los candidatos
        const candidates = response.body;

        // Visitar la página de detalles de la posición en el frontend
        cy.visit("http://localhost:3000/positions/1");

        // Verificar que cada candidato se muestra en la columna correcta
        candidates.forEach((candidate) => {
          cy.get(
            `div.text-center.card-header:contains("${candidate.currentInterviewStep}")`
          )
            .parent()
            .contains("div.card-title.h5", candidate.fullName)
            .should("be.visible");

          // Verificar que el número de puntos verdes (averageScore) es correcto
          if (candidate.averageScore > 0) {
            cy.get(`div[data-rbd-draggable-id="${candidate.candidateId}"]`)
              .find('span[role="img"]')
              .should("have.length", candidate.averageScore)
              .and("contain.text", "🟢");
          } else {
            cy.get(`div[data-rbd-draggable-id="${candidate.candidateId}"]`)
              .find('span[role="img"]')
              .should("not.exist");
          }
        });
      }
    );
  });

  it("should update candidate's stage on drag and drop", () => {
    // Hacer una solicitud al backend para obtener los datos de los candidatos
    cy.request("http://localhost:3010/positions/1/candidates").then(
      (response) => {
        // Verificar que la solicitud fue exitosa
        expect(response.status).to.eq(200);

        // Obtener los datos de los candidatos
        const candidates = response.body;

        // Visitar la página de detalles de la posición en el frontend
        cy.visit("http://localhost:3000/positions/1");

        // Seleccionar un candidato y una nueva etapa
        const candidate = candidates[0];
        const currentStage = candidates[0].currentInterviewStep;
        const newStage = candidates[1].currentInterviewStep;

        // Log the candidate and new stage
        cy.log(
          `Candidate: ${candidate.fullName}, Current Stage: ${currentStage}`
        );

        // Obtener el ID de la nueva etapa
        cy.request("http://localhost:3010/positions/1/interviewFlow").then(
          (response) => {
            const interviewFlow = response.body.interviewFlow.interviewFlow;
            const newStageID = interviewFlow.interviewSteps.find(
              (step) => step.name === newStage
            ).interviewTypeId;

            const newCurrentStageID = interviewFlow.interviewSteps.find(
              (step) => step.name === currentStage
            ).interviewTypeId;

            // Log the new stage ID
            cy.log(`New Stage ID: ${newStageID}`);
            console.log(`New Stage ID: ${newStageID}`);

            // Simular el arrastre de la tarjeta del candidato a la nueva columna
            cy.get(
              `div[data-rbd-draggable-id="${candidate.candidateId}"]`
            ).drag(`div[data-rbd-droppable-id="${newStageID}"]`, "center");

            // Verificar que la tarjeta del candidato se mueve a la nueva columna
            cy.get(`div[data-id="${newStageID}"]`)
              .contains("div.card-title.h5", candidate.fullName)
              .should("be.visible");

            // Verificar que la fase del candidato se actualiza correctamente en el backend
            cy.request("http://localhost:3010/positions/1/candidates").then(
              (response) => {
                const updatedCandidate = response.body.find(
                  (c) => c.candidateId === candidate.candidateId
                );

                // Log the updated candidate
                cy.log(`Updated Candidate: ${JSON.stringify(updatedCandidate)}`);

                expect(updatedCandidate.currentInterviewStep).to.eq(newStage);
              }
            );
          }
        );
      }
    );
  });
});