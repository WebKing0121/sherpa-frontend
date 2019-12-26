describe('Home page', () => {
  const url = Cypress.env('clientUrl');
  before(() => {
    cy.manualLogin();

    cy.waitForCall();

    cy.visit(`${url}/`);
  });

  it('should render home page route', () => {
    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });

  it('should display results', () => {
    cy.testApiData();
  });
});
