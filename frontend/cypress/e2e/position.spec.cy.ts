import { getDroppableSelector, getHandleSelector } from "./utils";

describe('Position Details Page', () => {
  beforeEach(() => {
    // Assuming we have a position with ID 1
    cy.visit('http://localhost:3000/positions/1');
  });

  it('should display the position title correctly', () => {
    cy.get('h2.text-center').should('exist').and('not.be.empty');
  });

  it('should display columns for each interview step', () => {
    cy.get('.row > div').should('have.length.at.least', 2);
    cy.get('.card-header').each(($header) => {
      cy.wrap($header).should('not.be.empty');
    });
  });

  it('should display candidate cards in the correct columns', () => {
    cy.get('.row > div').each(($column) => {
      cy.wrap($column).within(() => {
        cy.get('.stage-card-body').then(($stageCardBody) => {
          if ($stageCardBody.find('.candidate-card-body').length > 0) {
            cy.wrap($stageCardBody).within(() => {
              cy.get('.candidate-card-body').then(($candidateCard) => {
                cy.wrap($candidateCard).find('.candidate-card-title').should('exist').and('not.be.empty');
                cy.wrap($candidateCard).find('.candidate-card-rating').should('exist');
              });
            });
          } else {
            cy.log('No candidates in this column');
          }
        });
      });
    });
  });

  it('should allow dragging and dropping a candidate card to a new column', () => {
    // Wait for the page to load
    cy.get('.stage-card').should('have.length.at.least', 2);

    // Find the first column with a candidate
    cy.get('.stage-card-body').each(($column, columnIndex) => {
      if ($column.find('.candidate-card').length > 0) {
        cy.get(getDroppableSelector()).eq(0).as('sourceColumn'); // first column
        cy.get(getDroppableSelector()).eq(1).as('targetColumn'); // second column

        cy.get('@sourceColumn').within(() => {
          cy.get('[data-rbd-draggable-id="3"]').should('exist');
        })

        cy.get('@targetColumn').within(() => {
          cy.get('[data-rbd-draggable-id="3"]').should('not.exist');
        })

        cy.get('@sourceColumn')
          .find(getHandleSelector())
          .first()
          .focus()
          .trigger('keydown', { keyCode: 32 /** space */ })
          .trigger('keydown', { keyCode: 39 /** arrow right */, force: true })
          // finishing before the movement time is fine - but this looks nice
          // timing: outOfTheWay
          .wait(0,2 * 1000)
          .trigger('keydown', { keyCode: 32 /** space */, force: true });


        cy.get('@sourceColumn').within(() => {
          cy.get('[data-rbd-draggable-id="3"]').should('not.exist');
        })

        cy.get('@targetColumn').within(() => {
          cy.get('[data-rbd-draggable-id="3"]').should('exist');
        })

        // Intercept the PUT request
        cy.intercept('PUT', '/candidates/*').as('updateCandidate');

        // Wait for the PUT request to complete
        cy.wait('@updateCandidate').then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
          expect(interception.response.body).to.have.property('message', 'Candidate stage updated successfully');
        });

        // Exit the loop after finding and moving a card
        return false;
      }
    });
  });
});
