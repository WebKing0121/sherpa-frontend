describe('Support page', () => {
  before(() => {
    cy.login();

    cy.waitForCall();

    cy.visit('support');
  });

  it('renders support page route', () => {
    cy.location().should(location => {
      expect(location.pathname).to.eq('/support');
    });
  });

  it('displays results', () => {
    cy.testApiData();
  });
});
