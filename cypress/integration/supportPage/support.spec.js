describe('Support page', () => {
  const url = Cypress.env('clientUrl');
  const supportText =
    'We are dedicated to helping you succeed. Browse some of our support resources below.';
  const displayedData = '[data-test=displayed-data]';
  const supportCards = '[data-test=support-card]';
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

  it('displays the correct header text', () => {
    cy.get('h1').contains('Support');
    cy.get('h2').contains('How can we help');
  });

  it('displays the correct attributes, elements, and be clickable for each support result', () => {
    cy.get('p').contains(supportText);
    cy.fixture('support').then(support => {
      cy.get(supportCards).should('have.length', support.results.length);
      cy.get(supportCards).each(($card, index) => {
        const { url, icon, title, description } = support.results[index];
        expect($card).to.have.attr('href', url);
        expect($card).to.not.have.attr('disabled');
        cy.wrap($card).within(() => {
          cy.get('svg').should('have.attr', 'data-icon', icon[1]);
          cy.get('h3').should('contain', title);
          cy.get('div div').should('contain', description);
        });
      });
    });
  });
});
