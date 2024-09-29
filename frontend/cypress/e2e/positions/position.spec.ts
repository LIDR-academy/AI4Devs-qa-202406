/// <reference types="cypress" />

interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  currentInterviewStep: string;
  averageScore?: number;
  applicationId?: number;
  // Añade otros campos según tus fixtures
}

describe('Página de Position', () => {
  beforeEach(() => {
    // Interceptar todas las solicitudes GET
    cy.intercept('GET', '**', (req) => {
      console.log('Intercepted GET request:', req.url);
    }).as('getRequests');

    // Visitar la página de la posición específica
    cy.visit('/positions/1', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'log').as('consoleLog');
      },
    });

    // Esperar a que la aplicación se cargue completamente
    cy.get('body', { timeout: 10000 }).should('not.be.empty').then(() => {
      console.log('Body is not empty');
    });

    // Imprimir los logs de la consola
    cy.get('@consoleLog').then((consoleLog) => {
      console.log('Console logs:', consoleLog.args);
    });

    // Imprimir el contenido HTML del body
    cy.get('body').then(($body) => {
      console.log('Body HTML:', $body.html());
    });
  });

  it('debería mostrar el título de la posición correctamente', () => {
    // Verificar que el título de la posición está visible y contiene el texto esperado
    cy.get('.position-title').should('be.visible').and('contain.text', 'Senior Full-Stack Engineer');
  });

  it('debería mostrar las columnas correspondientes a cada fase del proceso de contratación', () => {
    const fases = ['Aplicación', 'Entrevista Técnica', 'Entrevista de RRHH', 'Contratado'];

    fases.forEach((fase) => {
      // Verificar que cada columna de fase est visible y contiene el nombre de la fase
      cy.get('.hiring-phase-column').contains(fase).should('be.visible');
    });
  });

  it('debería mostrar las tarjetas de los candidatos en la columna correcta según su fase actual', () => {
    // Datos de ejemplo de candidatos desde el fixture
    cy.fixture('positions/candidates.json').then((candidates: Candidate[]) => {
      candidates.forEach((candidate) => {
        // Selector de la columna correspondiente a la fase actual del candidato
        cy.get('.hiring-phase-column')
          .contains(candidate.currentInterviewStep)
          .parent()
          .within(() => {
            // Verificar que la tarjeta del candidato está presente en la columna correcta
            cy.get('.candidate-card').contains(`${candidate.firstName} ${candidate.lastName}`).should('be.visible');
          });
      });
    });
  });
});

export {}; // Añade esta línea al final o al inicio del archivo