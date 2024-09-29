import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Asegúrate de que esto sea correcto
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    specPattern: 'cypress/e2e/**/*.spec.ts',
    setupNodeEvents(on, config) {
      // Implementa aquí cualquier configuración de plugins si es necesario
      // Por ejemplo, puedes importar y usar plugins personalizados
      return config;
    },
  }
});
