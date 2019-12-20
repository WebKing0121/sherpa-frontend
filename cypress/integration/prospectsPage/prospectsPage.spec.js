describe('Prospect page', () => {
  before(() => {
    cy.login();

    cy.waitForCall();
  });

  it('should render prosects page route', () => {
    cy.visit('prospects');

    cy.location().should(location => {
      expect(location.pathname).to.eq('/prospects');
    });
  });

  it('should display results', () => {
    cy.testApiData();
  });
});
