export {};

const urls = [
  '/api/statistics/arrived-per-producer',
  '/api/statistics/arrived-total',
  '/api/statistics/bottles-expired',
  '/api/statistics/injections-available',
  '/api/statistics/injections-expired',
  '/api/statistics/injections-expiring-in-10d',
  '/api/statistics/injections-used'
];

describe('Queries', () => {
  it('return proper data', () => {
    urls.forEach((url) => {
      cy.request(url).then((res) => {
        expect(
          res.body.json.every(
            ({ date, ...rest }) =>
              typeof date === 'string' &&
              Object.values(rest).every((val) => typeof val === 'number')
          )
        ).to.eq(true);
      });
    });
  });
});
