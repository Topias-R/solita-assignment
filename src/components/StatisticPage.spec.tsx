import React from 'react';
import { unmount, mount } from '@cypress/react';
import { StatisticPage } from './StatisticPage';

const data = [
  {
    testValue: 2000,
    date: new Date('01/01')
  },
  {
    testValue: 4000,
    date: new Date('02/01')
  },
  {
    testValue: 6000,
    date: new Date('03/01')
  },
  {
    testValue: 8000,
    date: new Date('04/01')
  }
];

const component = (
  <div
    data-cy="statistic-container"
    style={{ width: '100vw', height: '100vh' }}
  >
    <StatisticPage title={'Test'} data={data}></StatisticPage>
  </div>
);

describe('StatisticPage', () => {
  beforeEach(() => {
    unmount();
    mount(component);
  });

  it('renders the statistics', () => {
    cy.contains('Test Value');
  });

  it('contains the correct values', () => {
    data.forEach(({ testValue, date }) => {
      cy.contains(
        date.toLocaleDateString(undefined, {
          month: '2-digit',
          day: '2-digit'
        })
      );
      cy.contains(testValue);
    });
  });

  it('scales automatically', () => {
    cy.viewport(500, 500);
    unmount();
    mount(component);
    cy.get('.recharts-surface').invoke('height').should('eq', 500);
    cy.get('.recharts-surface').invoke('width').should('eq', 500);

    cy.viewport(700, 700);
    unmount();
    mount(component);
    cy.get('.recharts-surface').invoke('height').should('eq', 700);
    cy.get('.recharts-surface').invoke('width').should('eq', 700);
  });
});
