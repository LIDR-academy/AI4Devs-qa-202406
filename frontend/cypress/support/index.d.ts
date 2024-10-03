declare namespace Cypress {
  interface Chainable<Subject> {
    move(options: { to: string }): Chainable<Subject>
  }
}
