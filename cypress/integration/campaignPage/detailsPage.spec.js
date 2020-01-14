describe('campaign details page', () => {
  const url = Cypress.env('clientUrl'),
    marketId = Cypress.env('testCampaign'),
    campaignId = Cypress.env('testCampaign'),
    campaignUrl = `markets/${marketId}/campaigns/${campaignId}/details`;

  before(() => {
    cy.login();
  });

  it('opens the correct page', () => {
    cy.server();
    cy.fixture(`campaign${campaignId}`).as(`campaign${campaignId}`);
    cy.route({ method: 'GET', url: '**/campaigns/**', response: `@campaign${campaignId}` }).as(
      'campaign'
    );
    cy.visit(`${url}/${campaignUrl}`);
    cy.wait('@campaign').then(() => {
      cy.location().should(location => {
        expect(location.pathname).to.eq(`/${campaignUrl}`);
      });
    });
  });

  it('displays the correct header', () => {
    cy.fixture(`campaign${campaignId}`).then(campaign => {
      cy.get(`[data-test=tabbed-header]`).then($header => {
        cy.wrap($header)
          .find('h1')
          .contains(campaign.name);
        cy.wrap($header)
          .find('button')
          .should('contain', 'Campaign List')
          .and('not.be.disabled');
      });
    });
  });

  it('displays the correct tabs', () => {
    cy.get('[data-test=Send]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-test=Messages]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-test=Notes]')
      .should('exist')
      .and('be.visible');
  });

  it('takes the user back to the campaigns page when clicking the "Campaign List" button', () => {
    cy.login();
    cy.server();
    cy.fixture(`campaign${campaignId}`).as(`campaign${campaignId}`);
    cy.route({ method: 'GET', url: '**/campaigns/**', response: `@campaign${campaignId}` }).as(
      'campaign'
    );
    cy.visit(`${url}/${campaignUrl}`);
    cy.get(`[data-test=tabbed-header]`)
      .find('button')
      .click();
    cy.location().should(location => {
      expect(location.pathname).to.eq(`/`);
    });
  });
});
