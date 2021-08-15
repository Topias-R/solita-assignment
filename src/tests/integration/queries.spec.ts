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

  /* 
  Accumulated values from the seed data:

  Total orders arrived: 5000
  Total injections arrived: 25015

  SolarBuddhica orders arrived: 1676
  SolarBuddhica injections arrived: 10056
  Zerpfy orders arrived: 1663
  Zerpfy injections arrived: 8315
  Antiqua orders arrived: 1661
  Antiqua injections arrived: 6644

  Bottles expired: 3504
  
  Injections expired: 12662

  Injections used: 7000

  Injections available: 555464

  Injections expiring in 10d: 188244
  */

  function reduceByKey(data: Record<string, unknown>[], key: string) {
    return data.reduce((acc, obj) => acc + +obj[key], 0);
  }

  it('returns correct values for seed data', () => {
    cy.request('/api/statistics/arrived-total').then((res) => {
      expect(reduceByKey(res.body.json, 'ordersArrived')).to.eq(5000);
      expect(reduceByKey(res.body.json, 'injectionsArrived')).to.eq(25015);
    });
    cy.request('/api/statistics/arrived-per-producer').then((res) => {
      expect(reduceByKey(res.body.json, 'SolarBuddhicaOrdersArrived')).to.eq(
        1676
      );
      expect(
        reduceByKey(res.body.json, 'SolarBuddhicaInjectionsArrived')
      ).to.eq(10056);
      expect(reduceByKey(res.body.json, 'ZerpfyOrdersArrived')).to.eq(1663);
      expect(reduceByKey(res.body.json, 'ZerpfyInjectionsArrived')).to.eq(8315);
      expect(reduceByKey(res.body.json, 'AntiquaOrdersArrived')).to.eq(1661);
      expect(reduceByKey(res.body.json, 'AntiquaInjectionsArrived')).to.eq(
        6644
      );
    });
    cy.request('/api/statistics/bottles-expired').then((res) => {
      expect(reduceByKey(res.body.json, 'bottlesExpired')).to.eq(3504);
    });
    cy.request('/api/statistics/injections-expired').then((res) => {
      expect(reduceByKey(res.body.json, 'injectionsExpired')).to.eq(12662);
    });
    cy.request('/api/statistics/injections-used').then((res) => {
      expect(reduceByKey(res.body.json, 'injectionsUsed')).to.eq(7000);
    });
    cy.request('/api/statistics/injections-available').then((res) => {
      expect(reduceByKey(res.body.json, 'injectionsAvailable')).to.eq(555464);
    });
    cy.request('/api/statistics/injections-expiring-in-10d').then((res) => {
      expect(reduceByKey(res.body.json, 'injectionsExpiringIn10D')).to.eq(
        188244
      );
    });
  });
});
