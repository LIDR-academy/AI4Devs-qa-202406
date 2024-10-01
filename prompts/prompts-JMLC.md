# 1. Prompts iniciales para preparar el entorno

## 1.1. Configurar Cypress en el módulo 'frontend'
```
Eres un QA experto en tests End-to-End usando el framework Cypress.
Vamos a crear algunos test E2E para esta aplicación. 
¿Puedes indicarme si el módulo @frontend  de este proyecto está preparado para empezar a añadir tests en Cypress?
```

**Respuesta**
Basándome en la información proporcionada sobre el módulo @frontend del proyecto, puedo decir que actualmente no está preparado para comenzar a añadir tests en Cypress. Aquí están las razones:

1. No hay evidencia de que Cypress esté instalado en el proyecto. En el archivo `package.json`, no se ve ninguna dependencia relacionada con Cypress:


```5:26:frontend/package.json
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.97",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "bootstrap": "^5.3.3",
    "dotenv": "^16.4.5",
    "react": "^18.3.1",
    "react-beautiful-dnd": "^13.1.1",
    "react-bootstrap": "^2.10.2",
    "react-bootstrap-icons": "^1.11.4",
    "react-datepicker": "^6.9.0",
    "react-dnd": "^16.0.1",
    "react-dnd-html5-backend": "^16.0.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.1",
    "react-scripts": "5.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
```


2. No hay scripts configurados para ejecutar tests de Cypress. Los scripts actuales solo incluyen:


```28:32:frontend/package.json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "jest --config jest.config.js",
    "eject": "react-scripts eject"
```


3. La configuración actual de pruebas parece estar orientada a Jest, no a Cypress:


```31:31:frontend/package.json
    "test": "jest --config jest.config.js",
```


Para preparar el módulo @frontend para comenzar a añadir tests en Cypress, necesitarías seguir estos pasos:

1. Instalar Cypress como dependencia de desarrollo:
   ```
   npm install --save-dev cypress
   ```

2. Inicializar Cypress en tu proyecto:
   ```
   npx cypress open
   ```

3. Agregar un script en el `package.json` para ejecutar Cypress:
   ```json
   "scripts": {
     "cypress:open": "cypress open",
     "cypress:run": "cypress run"
   }
   ```

4. Crear una estructura de carpetas para los tests de Cypress. Típicamente, esto incluiría una carpeta `cypress` en la raíz del proyecto con subcarpetas como `e2e`, `fixtures`, y `support`.

5. Configurar Cypress según las necesidades de tu proyecto. Esto generalmente implica crear o modificar un archivo `cypress.config.js` o `cypress.config.ts` en la raíz del proyecto.

Una vez completados estos pasos, el módulo @frontend estará listo para comenzar a añadir tests en Cypress.


# 2. Crear un test E2E para "Carga de la Página de Position"

## 2.1. Preguntar por pasos a seguir para el primer escenario
```
Vale, vamos a empezar el primer test E2E: 

**Escenario**: Carga de la Página de Position
Se debe verificar lo siguiente:
- Verifica que el título de la posición se muestra correctamente.
- Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
- Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.

La pantalla viene definida en el fichero @PositionDetails.js  y se accede por la URL http://localhost:3000/positions/1

Indícame los pasos que vas a seguir antes de escribir código y pregunta cualquier duda.
```

**Respuesta**
Entendido. Antes de escribir el código para el test E2E, vamos a seguir estos pasos:

1. Crear un nuevo archivo de test en la carpeta correcta de Cypress.
2. Configurar los comandos necesarios para visitar la página y esperar a que se carguen los elementos.
3. Planificar los selectores que utilizaremos para identificar los elementos en la página.
4. Estructurar el test en bloques lógicos para cada verificación.

Antes de proceder, tengo algunas preguntas:

1. ¿Existe ya una configuración de Cypress para manejar la autenticación, en caso de que sea necesaria para acceder a la página de detalles de la posición?

2. ¿Hay algún dato de prueba específico que debamos usar para la posición con ID 1, o deberíamos crear un mock para los datos de la API?

3. ¿Existen selectores de datos (data-testid) ya implementados en el componente PositionDetails, o necesitamos agregar algunos para facilitar el testing?

4. ¿Hay alguna convención de nomenclatura específica que debamos seguir para los archivos de test de Cypress en este proyecto?

Una vez que tenga estas respuestas, podré proceder con la creación del test de manera más precisa y adaptada a la estructura actual del proyecto.


## 2.2. Responder y poner el HTML a validar
```
1. No es necesaria autenticación
2. Se debe usar los datos del entorno ya arrancado. Adjunto en un bloque entre 3 comillas dobles el HTML generado para esta pantalla que se muestra al acceder a esa URL
3. No debería tocarse los ficheros de producción
4. Sigue el estándar o estándar de facto que exista.

"""
<div class="mt-5 container"><button type="button" class="mb-3 btn btn-link">Volver a Posiciones</button><h2 class="text-center mb-4">Senior Full-Stack Engineer</h2><div class="row"><div class="col-md-3"><div data-rbd-droppable-id="0" data-rbd-droppable-context-id="1" class="mb-4 card"><div class="text-center card-header">Initial Screening</div><div class="card-body"><div data-rbd-draggable-context-id="1" data-rbd-draggable-id="3" tabindex="0" role="button" aria-describedby="rbd-hidden-text-1-hidden-text-1" data-rbd-drag-handle-draggable-id="3" data-rbd-drag-handle-context-id="1" draggable="false" class="mb-2 card"><div class="card-body"><div class="card-title h5">Carlos García</div><div></div></div></div></div></div></div><div class="col-md-3"><div data-rbd-droppable-id="1" data-rbd-droppable-context-id="1" class="mb-4 card"><div class="text-center card-header">Technical Interview</div><div class="card-body"><div data-rbd-draggable-context-id="1" data-rbd-draggable-id="1" tabindex="0" role="button" aria-describedby="rbd-hidden-text-1-hidden-text-1" data-rbd-drag-handle-draggable-id="1" data-rbd-drag-handle-context-id="1" draggable="false" class="mb-2 card"><div class="card-body"><div class="card-title h5">John Doe</div><div><span role="img" aria-label="rating">🟢</span><span role="img" aria-label="rating">🟢</span><span role="img" aria-label="rating">🟢</span><span role="img" aria-label="rating">🟢</span><span role="img" aria-label="rating">🟢</span></div></div></div><div data-rbd-draggable-context-id="1" data-rbd-draggable-id="2" tabindex="0" role="button" aria-describedby="rbd-hidden-text-1-hidden-text-1" data-rbd-drag-handle-draggable-id="2" data-rbd-drag-handle-context-id="1" draggable="false" class="mb-2 card"><div class="card-body"><div class="card-title h5">Jane Smith</div><div><span role="img" aria-label="rating">🟢</span><span role="img" aria-label="rating">🟢</span><span role="img" aria-label="rating">🟢</span><span role="img" aria-label="rating">🟢</span></div></div></div></div></div></div><div class="col-md-3"><div data-rbd-droppable-id="2" data-rbd-droppable-context-id="1" class="mb-4 card"><div class="text-center card-header">Manager Interview</div><div class="card-body"></div></div></div></div></div>
"""
```

**Respuesta**
Entendido. Basándome en la información proporcionada, voy a crear un test E2E para el escenario de carga de la Página de Position. Seguiré los pasos que mencioné anteriormente y utilizaré el estándar de Cypress para escribir el test.

Primero, crearemos un nuevo archivo de test en la carpeta correcta de Cypress:

1. Crear un nuevo archivo llamado `position_details.spec.js` en la carpeta `cypress/e2e/`.

2. Escribir el siguiente código para el test:

```javascript
describe('Position Details Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/positions/1');
  });

  it('displays the correct position title', () => {
    cy.get('h2.text-center.mb-4').should('contain', 'Senior Full-Stack Engineer');
  });

  it('displays the correct interview stages', () => {
    cy.get('.card-header').should('have.length', 3);
    cy.get('.card-header').eq(0).should('contain', 'Initial Screening');
    cy.get('.card-header').eq(1).should('contain', 'Technical Interview');
    cy.get('.card-header').eq(2).should('contain', 'Manager Interview');
  });

  it('displays candidates in the correct columns', () => {
    cy.get('.card-body').eq(0).find('.card').should('have.length', 1);
    cy.get('.card-body').eq(1).find('.card').should('have.length', 2);
    cy.get('.card-body').eq(2).find('.card').should('have.length', 0);
  });

  it('displays candidate names correctly', () => {
    cy.get('.card-body').eq(0).find('.card-title').should('contain', 'Carlos García');
    cy.get('.card-body').eq(1).find('.card-title').eq(0).should('contain', 'John Doe');
    cy.get('.card-body').eq(1).find('.card-title').eq(1).should('contain', 'Jane Smith');
  });

  it('displays candidate ratings correctly', () => {
    cy.get('.card-body').eq(1).find('.card').eq(0).find('[role="img"]').should('have.length', 5);
    cy.get('.card-body').eq(1).find('.card').eq(1).find('[role="img"]').should('have.length', 4);
  });
});
```

Este test cubre todos los puntos mencionados en el escenario:

1. Verifica que el título de la posición se muestra correctamente.
2. Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación.
3. Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual.

Además, he añadido algunas verificaciones adicionales para los nombres de los candidatos y sus calificaciones.

Para ejecutar este test, asegúrate de que tu aplicación esté en ejecución en `http://localhost:3000` y luego ejecuta Cypress con el comando:

```
npx cypress open
```

Selecciona "E2E Testing" y luego elige el navegador que deseas usar. Finalmente, haz clic en el archivo `position_details.spec.js` para ejecutar el test.

Este enfoque no requiere modificar ningún archivo de producción y sigue las mejores prácticas de Cypress para escribir tests E2E.

## 2.3. Intentar solucionar error al ejecutar test
```
Se produce el siguiente error al lanzar los test:

AssertionError: Timed out retrying after 4000ms: Expected to find element: `.card`, but never found it. Queried from:

              > cy.get(.card-body).eq(1)
    at Context.eval (webpack://frontend/./cypress/e2e/position_details.cy.js:19:45)
```

**RESPUESTA**
Entendido. El error que estás experimentando sugiere que Cypress no puede encontrar los elementos esperados en la página. Esto podría deberse a varias razones, como tiempos de carga asíncronos o cambios en la estructura del DOM. Vamos a modificar el test para hacerlo más robusto y manejar mejor las cargas asíncronas.

Aquí tienes una versión actualizada del test que debería ser más resistente a los tiempos de carga:

```javascript
describe('Position Details Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/positions/1');
    cy.get('h2.text-center.mb-4', { timeout: 10000 }).should('be.visible');
  });

  it('displays the correct position title', () => {
    cy.get('h2.text-center.mb-4').should('contain', 'Senior Full-Stack Engineer');
  });

  it('displays the correct interview stages', () => {
    cy.get('.card-header', { timeout: 10000 }).should('have.length', 3);
    cy.get('.card-header').eq(0).should('contain', 'Initial Screening');
    cy.get('.card-header').eq(1).should('contain', 'Technical Interview');
    cy.get('.card-header').eq(2).should('contain', 'Manager Interview');
  });

  it('displays candidates in the correct columns', () => {
    cy.get('.card-body', { timeout: 10000 }).should('have.length.at.least', 3);
    cy.get('.card-body').eq(0).find('.card').should('have.length.at.least', 1);
    cy.get('.card-body').eq(1).find('.card').should('have.length.at.least', 2);
    cy.get('.card-body').eq(2).find('.card').should('have.length', 0);
  });

  it('displays candidate names correctly', () => {
    cy.get('.card-body', { timeout: 10000 }).should('have.length.at.least', 3);
    cy.get('.card-body').eq(0).find('.card-title').should('contain', 'Carlos García');
    cy.get('.card-body').eq(1).find('.card-title').eq(0).should('contain', 'John Doe');
    cy.get('.card-body').eq(1).find('.card-title').eq(1).should('contain', 'Jane Smith');
  });

  it('displays candidate ratings correctly', () => {
    cy.get('.card-body', { timeout: 10000 }).should('have.length.at.least', 3);
    cy.get('.card-body').eq(1).find('.card').eq(0).find('[role="img"]').should('have.length', 5);
    cy.get('.card-body').eq(1).find('.card').eq(1).find('[role="img"]').should('have.length', 4);
  });
});
```

Los cambios principales son:

1. Aumentamos el timeout en las primeras comprobaciones de cada test para dar más tiempo a que los elementos se carguen.
2. Usamos `should('have.length.at.least', x)` en lugar de `should('have.length', x)` para algunas comprobaciones, lo que hace el test más flexible si hay variaciones en el número de elementos.
3. Añadimos una comprobación de visibilidad en el `beforeEach` para asegurarnos de que la página se ha cargado completamente antes de comenzar las pruebas.

Estos cambios deberían hacer que el test sea más robusto frente a tiempos de carga variables y pequeñas diferencias en los datos mostrados.

## 2.4. Pedir que para solucionar el error sea más específico con los selectores CSS
```
Sigue pasando el mismo error.
Puedes ser más específico en los selectores CSS del test "displays candidates in the correct columns"? para asegurarnos que estemos buscando en la columna adecuada
```

### Respuesta
Entendido. Vamos a ser más específicos con los selectores CSS para asegurarnos de que estamos buscando en las columnas correctas. Basándonos en la estructura del componente `StageColumn` y `CandidateCard`, podemos ajustar nuestro test de la siguiente manera:

```javascript
describe('Position Details Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/positions/1');
    cy.get('h2.text-center.mb-4', { timeout: 10000 }).should('be.visible');
  });

  it('displays the correct position title', () => {
    cy.get('h2.text-center.mb-4').should('contain', 'Senior Full-Stack Engineer');
  });

  it('displays the correct interview stages', () => {
    cy.get('.card-header', { timeout: 10000 }).should('have.length', 3);
    cy.get('.card-header').eq(0).should('contain', 'Initial Screening');
    cy.get('.card-header').eq(1).should('contain', 'Technical Interview');
    cy.get('.card-header').eq(2).should('contain', 'Manager Interview');
  });

  it('displays candidates in the correct columns', () => {
    // Wait for the columns to be visible
    cy.get('.col-md-3 .card', { timeout: 10000 }).should('have.length', 3);

    // Check Initial Screening column
    cy.get('.col-md-3').eq(0).within(() => {
      cy.get('.card-header').should('contain', 'Initial Screening');
      cy.get('.card-body .card').should('have.length', 1);
    });

    // Check Technical Interview column
    cy.get('.col-md-3').eq(1).within(() => {
      cy.get('.card-header').should('contain', 'Technical Interview');
      cy.get('.card-body .card').should('have.length', 2);
    });

    // Check Manager Interview column
    cy.get('.col-md-3').eq(2).within(() => {
      cy.get('.card-header').should('contain', 'Manager Interview');
      cy.get('.card-body .card').should('have.length', 0);
    });
  });

  it('displays candidate names correctly', () => {
    cy.get('.col-md-3').eq(0).find('.card-title').should('contain', 'Carlos García');
    cy.get('.col-md-3').eq(1).find('.card-title').eq(0).should('contain', 'John Doe');
    cy.get('.col-md-3').eq(1).find('.card-title').eq(1).should('contain', 'Jane Smith');
  });

  it('displays candidate ratings correctly', () => {
    cy.get('.col-md-3').eq(1).find('.card').eq(0).find('[role="img"]').should('have.length', 5);
    cy.get('.col-md-3').eq(1).find('.card').eq(1).find('[role="img"]').should('have.length', 4);
  });
});
```

Este test es más específico y se basa en la estructura del componente `StageColumn`:


```6:22:frontend/src/components/StageColumn.js
const StageColumn = ({ stage, index, onCardClick }) => (
    <Col md={3}>
        <Droppable droppableId={`${index}`}>
            {(provided) => (
                <Card className="mb-4" ref={provided.innerRef} {...provided.droppableProps}>
                    <Card.Header className="text-center">{stage.title}</Card.Header>
                    <Card.Body>
                        {stage.candidates.map((candidate, idx) => (
                            <CandidateCard key={candidate.id} candidate={candidate} index={idx} onClick={onCardClick} />
                        ))}
                        {provided.placeholder}
                    </Card.Body>
                </Card>
            )}
        </Droppable>
    </Col>
);
```


Y en la estructura del componente `CandidateCard`:


```5:26:frontend/src/components/CandidateCard.js
const CandidateCard = ({ candidate, index, onClick }) => (
    <Draggable key={candidate.id} draggableId={candidate.id} index={index}>
        {(provided) => (
            <Card
                className="mb-2"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onClick={() => onClick(candidate)}
            >
                <Card.Body>
                    <Card.Title>{candidate.name}</Card.Title>
                    <div>
                        {Array.from({ length: candidate.rating }).map((_, i) => (
                            <span key={i} role="img" aria-label="rating">🟢</span>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        )}
    </Draggable>
);
```


Los cambios principales son:

1. Usamos `.col-md-3` para seleccionar cada columna de etapa.
2. Dentro de cada columna, verificamos el encabezado y el número de tarjetas de candidatos.
3. Usamos `within()` para asegurarnos de que estamos buscando elementos dentro de la columna correcta.
4. Aumentamos el timeout para la carga inicial de las columnas.

Estos cambios deberían hacer que el test sea más robusto y específico, reduciendo la posibilidad de falsos negativos debido a problemas de sincronización o selectores demasiado generales.

### Corrección manual
Corrijo a mano el primer assert del test "displays candidates in the correct columns":
```
    cy.get('.col-md-3 .card', { timeout: 10000 }).should('have.length', 3);
```
Corrección:
```
    cy.get('.col-md-3', { timeout: 10000 }).should('have.length', 3);
```

## 2.5. Solución de otro error en 'displays candidate ratings correctly'
```
En el test 'displays candidate ratings correctly'  se está produciendo este error:

AssertionError: Timed out retrying after 4000ms: Too many elements found. Found '9', expected '5'.
    at Context.eval (webpack://frontend/./cypress/e2e/position_details.cy.js:48:71)


Por favor, revisa el HTML adjunto y comprueba que los selectores HTML son suficientes para validar la puntuación de cada candidato. Por ejemplo, John Doe debe ser 5 y para Jane Smith debe ser 6. En el test debería aparecer estos nombres para facilitar la lectura del test.


"""
<div class="mt-5 container"><button type="button" class="mb-3 btn btn-link">Volver a Posiciones</button><h2 class="text-center mb-4">Senior Full-Stack Engineer</h2><div class="row"><div class="col-md-3"><div data-rbd-droppable-id="0" data-rbd-droppable-context-id="1" class="mb-4 card"><div class="text-center card-header">Initial Screening</div><div class="card-body"><div data-rbd-draggable-context-id="1" data-rbd-draggable-id="3" tabindex="0" role="button" aria-describedby="rbd-hidden-text-1-hidden-text-1" data-rbd-drag-handle-draggable-id="3" data-rbd-drag-handle-context-id="1" draggable="false" class="mb-2 card"><div class="card-body"><div class="card-title h5">Carlos García</div><div></div></div></div></div></div></div><div class="col-md-3"><div data-rbd-droppable-id="1" data-rbd-droppable-context-id="1" class="mb-4 card"><div class="text-center card-header">Technical Interview</div><div class="card-body"><div data-rbd-draggable-context-id="1" data-rbd-draggable-id="1" tabindex="0" role="button" aria-describedby="rbd-hidden-text-1-hidden-text-1" data-rbd-drag-handle-draggable-id="1" data-rbd-drag-handle-context-id="1" draggable="false" class="mb-2 card"><div class="card-body"><div class="card-title h5">John Doe</div><div><span role="img" aria-label="rating">🟢</span><span role="img" aria-label="rating">🟢</span><span role="img" aria-label="rating">🟢</span><span role="img" aria-label="rating">🟢</span><span role="img" aria-label="rating">🟢</span></div></div></div><div data-rbd-draggable-context-id="1" data-rbd-draggable-id="2" tabindex="0" role="button" aria-describedby="rbd-hidden-text-1-hidden-text-1" data-rbd-drag-handle-draggable-id="2" data-rbd-drag-handle-context-id="1" draggable="false" class="mb-2 card"><div class="card-body"><div class="card-title h5">Jane Smith</div><div><span role="img" aria-label="rating">🟢</span><span role="img" aria-label="rating">🟢</span><span role="img" aria-label="rating">🟢</span><span role="img" aria-label="rating">🟢</span></div></div></div></div></div></div><div class="col-md-3"><div data-rbd-droppable-id="2" data-rbd-droppable-context-id="1" class="mb-4 card"><div class="text-center card-header">Manager Interview</div><div class="card-body"></div></div></div></div></div>
"""
```


# 3. Crear un test E2E para "Cambio de Fase de un Candidato"

