export {};

const routes = [
  '/statistics/arrived-total',
  '/statistics/arrived-per-producer',
  '/statistics/bottles-expired',
  '/statistics/injections-expired',
  '/statistics/injections-used',
  '/statistics/injections-available',
  '/statistics/injections-expiring-in-10d'
];

describe('Navigation', () => {
  it('navigates to all routes', () => {
    cy.visit('/');
    cy.get('a').should('have.length', routes.length);
    routes.forEach((route) => {
      cy.get(`a[href="${route}"]`).click();
      // Increase timeout to 15s to accommodate running the test in dev mode
      cy.location('pathname', { timeout: 15000 }).should('equal', route);
    });
  });
});
