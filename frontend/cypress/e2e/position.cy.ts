import { getHandleSelector, getDroppableSelector } from '../support/util';

interface CandidatesByColumn {
  [key: string]: string[];
}

describe('Position Details Page', () => {
  const positionTitle = 'Senior Full-Stack Engineer';
  const columns: string[] = ['Initial Screening', 'Technical Interview', 'Manager Interview'];
  const candidates: CandidatesByColumn = {
    'Initial Screening': ['Carlos García'],
    'Technical Interview': ['John Doe', 'Jane Smith'],
    'Manager Interview': []
  };

  beforeEach(() => {
    cy.visit('/positions/1');
  });

  it('Carga de la Página de Position', () => {
    cy.get('h2').should('contain', positionTitle);

    columns.forEach((column, index) => {
      cy.get('.row > div').eq(index).find('.card-header').should('contain', column);

      const candidatesInColumn = candidates[column];
      cy.get('.row > div').eq(index).find('.card-body > .card').should('have.length', candidatesInColumn.length);

      candidatesInColumn.forEach(candidate => {
        cy.get('.row > div').eq(index).find('.card').should('contain', candidate);
      });
    });
  });

  it('Cambio de Fase de un Candidato', () => {
    const sourceColumn = 0;
    const targetColumn = 1;
    const candidateToMove = 3;

    const sourceSelector = getDroppableSelector(sourceColumn);
    const targetSelector = getDroppableSelector(targetColumn);
    const draggableSelector = getHandleSelector(candidateToMove);

    cy.get(sourceSelector).find(draggableSelector).as('dragHandle');

    cy.get('@dragHandle')
      .move({ to: targetSelector });

    cy.get(targetSelector)
      .find(draggableSelector)
      .should('exist');

    cy.get(sourceSelector)
      .find(draggableSelector)
      .should('not.exist');

    cy.intercept('PUT', '/candidates/*').as('updateCandidate');
    cy.wait('@updateCandidate').its('response.statusCode').should('eq', 200);
  });
});
