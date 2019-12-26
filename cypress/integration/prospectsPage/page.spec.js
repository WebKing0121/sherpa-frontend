describe('Prospect page', () => {
  const url = Cypress.env('clientUrl');
  before(() => {
    cy.manualLogin();

    cy.waitForCall();
  });

  it('renders prosects page route', () => {
    cy.visit(`${url}/prospects`);

    cy.location().should(location => {
      expect(location.pathname).to.eq('/prospects');
    });
  });

  it('displays results', () => {
    cy.testApiData();
  });
});
