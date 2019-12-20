describe('Home page', () => {
  before(() => {
    cy.login();

    cy.waitForCall();

    cy.visit('/');
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
