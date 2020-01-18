describe('Home page', () => {
  // const url = Cypress.env('clientUrl');
  before(() => {
    cy.login();
  });

  it('should render home page route', () => {
    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });
});
