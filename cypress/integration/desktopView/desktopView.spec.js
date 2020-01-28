describe('DesktopView Test', () => {
  const NoDesktopComponent = '[data-test=no-desktop]';
  const marketId = Cypress.env('testMarket');

  // setup
  before(() => {
    cy.login();
  });

  it('not render app on desktop', () => {
    cy.viewport(950, 800);
    cy
      .get(NoDesktopComponent)
      .should('be.visible');
  });

  it('should render app on desktop', () => {
    cy.viewport(950, 800);
    cy
      .get(NoDesktopComponent)
      .should('not.be.visible');
  });
});
