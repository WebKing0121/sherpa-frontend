describe('data loader wrapper component', () => {
  const spinner = '[data-test=spinner]',
    data = '[data-test=displayed-data]',
    timeout = 0,
    url = Cypress.env('clientUrl');
  beforeEach(() => {
    cy.login();
    cy.visit(`${url}/support`);
  });

  it('displays the spinner and not display data', () => {
    cy.get(spinner, { timeout }).should('exist');
    cy.get(data, { timeout }).should('not.exist');
  });

  it('displays the data and not display spinner', () => {
    cy.waitForCall();
    cy.get(spinner, { timeout }).should('not.exist');
    cy.get(data, { timeout }).should('exist');
  });
});
