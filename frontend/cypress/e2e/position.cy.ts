import { getHandleSelector, getDroppableSelector } from '../support/util';

interface Candidate {
  id: number;
  name: string;
}

interface CandidatesByColumn {
  [key: string]: Candidate[];
}

describe('Position Details Page', () => {
  const positionTitle = 'Senior Full-Stack Engineer';
  const columns: string[] = ['Initial Screening', 'Technical Interview', 'Manager Interview'];
  const candidates: CandidatesByColumn = {
    'Initial Screening': [{ id: 3, name: 'Carlos García' }],
    'Technical Interview': [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }],
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
        cy.get('.row > div').eq(index).find('.card').should('contain', candidate.name);
      });
    });
  });

  it('Cambio de Fase de un Candidato', () => {
    const sourceColumn = 'Initial Screening';
    const targetColumn = 'Technical Interview';
    const candidateToMove = candidates[sourceColumn][0];

    const sourceSelector = getDroppableSelector(columns.indexOf(sourceColumn));
    const targetSelector = getDroppableSelector(columns.indexOf(targetColumn));
    const draggableSelector = getHandleSelector(candidateToMove.id);

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
