describe('Prospect page', () => {
  before(() => {
    cy.login();

    cy.waitForCall();
  });

  it('renders prosects page route', () => {
    cy.visit('prospects');

    cy.location().should(location => {
      expect(location.pathname).to.eq('/prospects');
    });
  });

  it('displays results', () => {
    cy.testApiData();
  });
});
