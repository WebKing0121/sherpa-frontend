describe('No Desktop screen', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  it('displays the desktop when the user has an active subscription', () => {
    cy.getState().then(state => {
      const userData = state.auth.userData;
      cy.get('[data-test=no-desktop]').should('not.exist');
    });;

  });

  it('does not display desktop and instead displays the NoDesktop component when there user does not have an active subscription', () => {
    cy.getState().then(state => {
      const userData = state.auth.userData;
      userData.company.subscriptionStatus = 'inactive';
      cy.dispatchAction({ type: "SET_USER_DATA", userData });
      cy.get('[data-test=no-desktop]').should('exist');
    });
  });
});