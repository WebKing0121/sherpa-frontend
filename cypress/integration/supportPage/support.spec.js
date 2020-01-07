describe('Support page', () => {
  const url = Cypress.env('clientUrl');
  before(() => {
    cy.login();
  });

  it('renders support page route', () => {
    cy.server();
    cy.stubResponse({ url: 'support-links', response: 'support' });
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
