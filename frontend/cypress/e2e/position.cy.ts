describe("Positions Page", () => {
  it("should display the correct position titles", () => {
    // Hacer una solicitud al backend para obtener los datos de las posiciones
    cy.request("http://localhost:3010/positions").then((response) => {
      // Verificar que la solicitud fue exitosa
      expect(response.status).to.eq(200);

      // Obtener los datos de las posiciones
      const positions = response.body;

      // Visitar la página de posiciones en el frontend
      cy.visit("http://localhost:3000/positions");

      // Verificar que cada título de posición se muestra correctamente
      positions.forEach((position) => {
        cy.contains("div.card-title.h5", position.title).should("be.visible");
      });
    });
  });
});
