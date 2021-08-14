export {};

describe('The Index Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.contains('Fictional Vaccine Statistics');
  });
});
