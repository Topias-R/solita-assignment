import React from 'react';
import { mount, unmount } from '@cypress/react';
import { TabNavigationBar } from './TabNavigationBar';

const tabs: [string, string][] = [
  ['Test1', '/test-1'],
  ['Test2', '/test-2'],
  ['Test3', '/test-3']
];

const pathname = tabs[0][1];

const component = (
  <TabNavigationBar pathname={pathname} tabs={tabs}></TabNavigationBar>
);

describe('TabNavigationBar', () => {
  beforeEach(() => {
    unmount();
    mount(component);
  });

  it('renders the bar', () => {
    cy.contains(tabs[0][0]);
  });

  it('contains the correct amount of tabs', () => {
    cy.get('a').should('have.length', tabs.length);
  });

  it('contains the correct labels', () => {
    tabs.forEach(([label]) => cy.contains(label));
  });

  it('contains the correct links', () => {
    cy.get('a').each((link, idx) => {
      expect(link.attr('href')).to.equal(tabs[idx][1]);
    });
  });

  it('highlights current path', () => {
    tabs.forEach(([, path]) => {
      unmount();
      mount(<TabNavigationBar pathname={path} tabs={tabs}></TabNavigationBar>);
      cy.get('[aria-selected=true]')
        .invoke('attr', 'href')
        .should('equal', path);
    });
  });

  it('does not highlight when not in one of the tabs', () => {
    unmount();
    mount(
      <TabNavigationBar pathname={'/off-path'} tabs={tabs}></TabNavigationBar>
    );
    cy.get('[aria-selected=true]', { timeout: 0 }).should('not.exist');
  });
});
