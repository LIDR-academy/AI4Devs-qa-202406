/// <reference types="cypress" />

interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  currentInterviewStep: string;
  averageScore?: number;
  applicationId?: number;
}

describe('Página de Position', () => {
  beforeEach(() => {
    cy.intercept('GET', '**', (req) => {
      console.log('Intercepted GET request:', req.url);
    }).as('getRequests');

    cy.visit('/positions/1', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'log').as('consoleLog');
      },
    });

    cy.get('body', { timeout: 10000 }).should('not.be.empty').then(() => {
      console.log('Body is not empty');
    });

    cy.get('@consoleLog').then((consoleLog) => {
      console.log('Console logs:', consoleLog.args);
    });

    const fases = ['Initial Screening', 'Technical Interview', 'Manager Interview'];
    cy.get('body').then(($body) => {
      console.log('Body HTML:', $body.html());
    });
  });

  it('debería mostrar el título de la posición correctamente', () => {
    cy.get('.text-center').should('be.visible').and('contain.text', 'Senior Full-Stack Engineer');
  });

  it('debería mostrar las columnas correspondientes a cada fase del proceso de contratación', () => {
    const fases = ['Initial Screening', 'Technical Interview', 'Manager Interview'];

    fases.forEach((fase) => {
      cy.get('.col-md-3').contains(fase).should('be.visible');
    });
  });

  it('debería mostrar las tarjetas de los candidatos en la página', () => {
    cy.get('body', { timeout: 10000 }).should('be.visible');

    cy.fixture('positions/candidates.json').then((candidates: Candidate[]) => {
      candidates.forEach((candidate) => {
        cy.contains(`${candidate.firstName} ${candidate.lastName}`).should('be.visible');
        
        cy.contains(candidate.currentInterviewStep).should('be.visible');
      });
    });
  });
});

export {}; 