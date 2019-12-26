describe('Support page', () => {
  const url = Cypress.env('clientUrl');
  before(() => {
    cy.manualLogin();
    cy.waitForCall();
    cy.fixture('support').as('support');
  });

  it('renders support page route', () => {
    cy.server();
    cy.route('GET', '**/support-links', '@support').then(({ response }) => {
      cy.window()
        .its('store')
        .then(store => {
          store.dispatch({ type: 'SET_SUPPORT_ITEMS', items: response });
        });
    });
    cy.visit(`${url}/support`);

    cy.location().should(location => {
      expect(location.pathname).to.eq('/support');
    });
  });

  it('displays correct support results', () => {
    cy.fixture('support').then(support => {
      cy.get('[data-test=displayed-data] a').should('have.length', support.results.length);
    });
  });
});
