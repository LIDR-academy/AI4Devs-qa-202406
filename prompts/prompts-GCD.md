Eres un tester QA experto en testing End2End. Estás trabajando en la aplicación descrita en @README.md. Debes crear pruebas E2E para verificar los siguientes escenarios:

1. Carga de la Página de Position:
    - Verifica que el título de la posición se muestra correctamente.
    - Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
    - Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.

2. Cambio de Fase de un Candidato:
    - Simula el arrastre de una tarjeta de candidato de una columna a otra.
    - Verifica que la tarjeta del candidato se mueve a la nueva columna.
    - Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id.

La tecnología usada es React, Node.js, Express y Prisma.ORM. La base de datos usada es PostgreSQL.

Para la prueba E2E vas a usar Cypress.

No escribas nada aún, solo piensa la estructura de pruebas. Si tienes alguna duda, pregunta.

----------------------------------------------------------------------------------------------------------------------

# Pruebas End2End para el Sistema de Seguimiento de Talento

A continuación, se presenta la estructura de las pruebas End2End utilizando Cypress para verificar los escenarios descritos.

## 1. Escenario: Carga de la Página de Position

### 1.1. Verificar que el título de la posición se muestra correctamente
- **Descripción**: Asegurarse de que el título de la posición cargada coincide con el esperado.
- **Pasos**:
  1. Navegar a la página de detalles de una posición específica.
  2. Obtener el elemento que contiene el título de la posición.
  3. Verificar que el texto del título coincide con el valor esperado.

### 1.2. Verificar que se muestran las columnas correspondientes a cada fase del proceso de contratación
- **Descripción**: Confirmar que todas las columnas de fases (por ejemplo, "Entrevista Técnica", "Entrevista de Recursos Humanos") están presentes en la página.
- **Pasos**:
  1. Identificar las columnas de fases en la página.
  2. Verificar que cada columna esperada está presente y visible.

### 1.3. Verificar que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual
- **Descripción**: Asegurarse de que cada candidato aparece en la columna que corresponde a su fase actual del proceso de contratación.
- **Pasos**:
  1. Navegar a la página de detalles de una posición.
  2. Obtener las tarjetas de candidatos y sus respectivas fases.
  3. Verificar que cada tarjeta de candidato está ubicada en la columna correcta según su fase.

## 2. Escenario: Cambio de Fase de un Candidato

### 2.1. Simular el arrastre de una tarjeta de candidato de una columna a otra
- **Descripción**: Realizar una acción de arrastrar y soltar una tarjeta de candidato de una fase a otra.
- **Pasos**:
  1. Identificar la tarjeta de un candidato en una columna específica.
  2. Arrastrar la tarjeta y soltarla en otra columna que representa una fase diferente.

### 2.2. Verificar que la tarjeta del candidato se mueve a la nueva columna
- **Descripción**: Confirmar que la tarjeta del candidato ya no está en la columna original y ahora está en la nueva columna.
- **Pasos**:
  1. Después de la acción de arrastrar y soltar, verificar que la tarjeta ya no está en la columna de origen.
  2. Verificar que la tarjeta se encuentra en la columna de destino.

### 2.3. Verificar que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id
- **Descripción**: Asegurarse de que la actualización de la fase del candidato se refleja en la base de datos mediante una petición al backend.
- **Pasos**:
  1. Realizar la acción de arrastrar y soltar la tarjeta del candidato.
  2. Interceptar la petición PUT realizada al backend.
  3. Verificar que la petición contiene los datos correctos de la actualización.
  4. Validar que la respuesta de la petición es exitosa y que los datos han sido actualizados correctamente.

## Consideraciones Adicionales

- **Configuración Inicial**:
  - Asegurarse de que la base de datos está poblada con datos de prueba antes de ejecutar las pruebas.
  - Configurar Cypress para manejar autenticación si es necesaria.

- **Limpieza Post-Prueba**:
  - Restablecer el estado de la base de datos después de cada prueba para garantizar la independencia de las mismas.

- **Manejo de Errores**:
  - Implementar verificaciones para manejar posibles fallos en la carga de la página o en las peticiones al backend.

----------------------------------------------------------------------------------------------------------------------

De acuerdo, comienza con el escenario 1.1
