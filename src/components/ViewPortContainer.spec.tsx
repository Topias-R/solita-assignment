import React from 'react';
import { mount, unmount } from '@cypress/react';
import { ViewPortContainer } from './ViewPortContainer';

const component = <ViewPortContainer></ViewPortContainer>;

describe('ViewPortContainer', () => {
  beforeEach(() => {
    unmount();
    mount(component);
  });

  it('should have viewport dimensions', () => {
    cy.get('body').invoke('attr', 'style', 'margin: 0');

    cy.viewport(500, 500);
    unmount();
    mount(component);
    cy.get('[class^="makeStyles"]').invoke('height').should('eq', 500);
    cy.get('[class^="makeStyles"]').invoke('width').should('eq', 500);

    cy.viewport(700, 700);
    unmount();
    mount(component);
    cy.get('[class^="makeStyles"]').invoke('height').should('eq', 700);
    cy.get('[class^="makeStyles"]').invoke('width').should('eq', 700);
  });

  it('should render children', () => {
    unmount();
    mount(
      <ViewPortContainer>
        <div data-cy="child-div-1"></div>
        <div data-cy="child-div-2"></div>
      </ViewPortContainer>
    );

    cy.get('[data-cy=child-div-1]');
    cy.get('[data-cy=child-div-2]');
  });
});
