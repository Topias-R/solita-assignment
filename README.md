# Solita Assignment

This is a solution to the Solita Dev Academy (Autumn 2021) recruitment assignment.

## Technology Choices

- TypeScript
- Next.js
- PostgreSQL

## About

The task was to create a web application for presenting data about vaccine orders and vaccinations. Data is presented in line charts and revalidated for updates every minute. [There is a static demo of the application running on Github Pages.](https://topias-r.github.io/solita-assignment/ 'Fictional Vaccine Statistics')

## How to

Make sure you have Node.js, Docker and Docker Compose installed. Clone the repository and if using Cypress Test Runners (without Docker), install dependencies with `npm i`. Cypress may require dependencies you don't have, in that case you can try running the tests in containers. The web application runs on port 3000.

- `docker-compose up --build` to start the development server.
- `docker-compose -f "docker-compose.test.yml" up --build --exit-code-from next` to run tests in containers.
- `docker-compose -f "docker-compose.prod.yml" up --build` to start a production build of the application.
- `npm run cypress:open:ct` to open the Cypress Component Test Runner.
- `npm run cypress:open` (development server running) to open the Cypress Test Runner.
- `npm run test` (development server running) to run tests headlessly against the development server.
