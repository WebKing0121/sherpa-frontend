describe('data loader wrapper component', () => {
  const spinner = '[data-test=spinner]';
  const data = '[data-test=displayed-data]';
  const timeout = 0;
  beforeEach(() => {
    cy.login();

    cy.waitForCall();

    cy.visit('support');
  });

  it('should display the spinner and not display data', () => {
    cy.get(spinner, { timeout }).should('exist');
    cy.get(data, { timeout }).should('not.exist');
  });

  it('should display the data and not display spinner', () => {
    cy.waitForCall();
    cy.get(spinner, { timeout }).should('not.exist');
    cy.get(data, { timeout }).should('exist');
  });
});
