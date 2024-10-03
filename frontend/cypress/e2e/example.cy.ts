describe('My First Test', () => {
  it('Visits the app', () => {
    cy.visit('/')
    cy.contains('h1', 'Dashboard del Reclutador')
  })
})
