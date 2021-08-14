Cypress.on('uncaught:exception', (err) => {
  // Ignore this error because flaky with dynamically sized components.
  if (/^[^(ResizeObserver loop limit exceeded)]/.test(err.message)) {
    return false;
  }
});
