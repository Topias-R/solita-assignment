export {};

const pages = [
  '/statistics/arrived-total',
  '/statistics/arrived-per-producer',
  '/statistics/bottles-expired',
  '/statistics/injections-expired',
  '/statistics/injections-used',
  '/statistics/injections-available',
  '/statistics/injections-expiring-in-10d'
];

describe('The Statistics Pages', () => {
  it('successfully load', () => {
    pages.forEach((page) => {
      cy.visit(page);
    });
  });
});
