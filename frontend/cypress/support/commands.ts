import * as keyCodes from './key-codes';

Cypress.Commands.add('move', { prevSubject: 'element' }, (subject, options: { to: string }) => {
  cy.wrap(subject)
    .focus()
    .trigger('keydown', { keyCode: keyCodes.space })
    .trigger('keydown', { keyCode: keyCodes.arrowRight, force: true })
    .wait(0.2 * 1000)
    .trigger('keydown', { keyCode: keyCodes.space, force: true });

  cy.get(options.to).should('exist');
});
