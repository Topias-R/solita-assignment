# Solita Assignment

This is a solution to the Solita Dev Academy (Autumn 2021) recruitment assignment.

## Technology Choices

- TypeScript
- Next.js
- PostgreSQL

## About

The task was to create a web application for presenting data about vaccine orders and vaccinations. [There is a static demo of the application running on Github Pages.](https://topias-r.github.io/solita-assignment/ 'Fictional Vaccine Statistics')

## How to

Make sure you have Node.js, Docker and Docker Compose installed. Cypress may require dependencies you don't have, in that case you can try running the tests in containers.

- `$ docker-compose up` to start the development server.
- `$ npm run cypress:open` (development server running) to open the Cypress Test Runner.
- `$ npm run cypress:open:ct` to open the Cypress Component Test Runner.
- `$ npm run test` (development server running) to run tests headlessly.
- `$ docker-compose -f "docker-compose.test.yml" up --build --exit-code-from next` to run tests in containers.
