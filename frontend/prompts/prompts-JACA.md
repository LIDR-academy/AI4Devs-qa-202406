# Cursor Prompts

## Prompt 1
Act as an expert QA Test Engineer with specialization in e2e tests and Cypress.

We're going to implement a couple of e2e test scenarios for this project in the Positions page.

Before starting with code, analyze and understand this LTI project. You can find the backend implementation in the @backend folder and the frontend implementation in the @frontend folder.

Ask any questions you have. After that I'll provide the scenarios to be tested.


## Prompt 2
1. The frontend is using React with a combination of JS and TS; and backend is using Express.js with TS.
2. Yeah, the route is `/positions/:id`. You can get there from the Dashboard (main) page clicking "Ir a Posiciones" button, then you'll visualize the Positions page with existing positions, there you can click the "Ver proceso" button to finally get to the Position Details page. The code is implemented in the @PositionDetails.js file
3. So far, we don't have any auth mechanism.
4. We're starting from scratch with Cypress. However, remember to always follow the best QA practices. We'll create a new folder structure `/tests/cypress/integration` under `frontend/src` folder that will contain a test file `position.spec.js`.
5. We'll work in two scenarios in the Position Details page but before sharing the test scenarios, let me know if you have any other question or you're ready to start working in the code.


## Prompt 3
Let's start with the first scenario.

We must validate the following in the Positions page:
- The title must be displayed properly.
- Columns must be displayed accordingly to each phase of the application.
- Candidate cards must be displayed in the proper column application phase based in their current step.


## Prompt 4
For the code present, we get this error:
```
'cy' is not defined.
```
How can I resolve this? If you propose a fix, please make it concise.


## Prompt 5
The test `should display candidate cards in the correct columns` returned the following error:
```
Timed out retrying after 4000ms: expected '<div.mb-2.card>' to contain 'Candidate'
```


## Prompt 6
There's a new error in the test `should display candidate cards in the correct columns`:
```
Timed out retrying after 4000ms: Expected to find content: 'Rating:' within the element: <div.card-body> but never did.
```


## Prompt 7
A new error was retrieved by the `should display candidate cards in the correct columns`:
```
Timed out retrying after 4000ms: Expected to find element: .card-title, but never found it. Queried from:
```

Modify the test to avoid failure when the step interview column is empty since in some scenarios, it's possible that any candidate have reached that step yet.


## Prompt 8
The error persists, still failing in an empty column.


## Prompt 9
I added some class names to StageColumns and CandidateCard to avoid confussions between both `.card-body`. However, the error still persists trying to find candidate cards inside stage cards, but it's a valid scenario to have an empty stage card column.


## Prompt 10
Let's work in the second scenario

We must validate the following in the Positions page:
- Simulate the Drag & Drop feature of the card candidates between the current column and a new one.
- Verify that the moved card stays in the new target column.
- Check the candidate's step was updated successfully through the endpoint `PUT /candidate/:id`


## Prompt 11
The test returned an error

```
Timed out retrying after 4000ms: Expected <div.candidate-card.mb-2.card> not to exist in the DOM, but it was continuously found. Queried from:

> <div.stage-card-body.card-body>
```
