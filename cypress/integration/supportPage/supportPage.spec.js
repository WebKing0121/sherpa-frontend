describe('Support page', () => {
  before(() => {
    cy.login();

    cy.waitForCall();

    cy.visit('support');
  });

  it('should render support page route', () => {
    cy.location().should(location => {
      expect(location.pathname).to.eq('/support');
    });
  });

  it('should display results', () => {
    cy.testApiData();
  });
});
