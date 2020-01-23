describe('Home page', () => {
  const url = Cypress.env('clientUrl'),
    marketId = Cypress.env('testMarket'),
    campaignUrl = `markets/${marketId}/campaigns`,
    listItem = '[data-test=list-item]',
    itemHeader = '[data-test=list-item-header]',
    itemLink = '[data-test=list-item-link]';

  before(() => {
    cy.login();
    cy.createFixture(`market${marketId}campaigns.json`, `campaigns`, 'GET', {
      qs: { market: marketId, is_archived: false }
    });
  });

  it('navigates to campaign page path', () => {
    cy.server();
    cy.stubResponse({ url: `campaigns`, response: `market${marketId}campaigns` }).then(res => {
      cy.visit(`${url}/${campaignUrl}`);
      cy.wait(`@${res.alias}`);
      cy.location().should(location => {
        expect(location.pathname).to.eq(`/${campaignUrl}`);
      });
    });
  });

  it('renders the campaigns for the selected market', () => {
    cy.get('[data-test=displayed-data]').should('exist');
  });

  it('renders the correct markets, lead amount, and priority amount', () => {
    cy.getState().then(({ campaigns }) => {
      const campaignArr = Object.values(campaigns.campaigns);
      cy.get(listItem).each(($item, idx) => {
        cy.wrap($item)
          .find(itemHeader)
          .contains(campaignArr[idx].name);
        cy.wrap($item)
          .find('[data-test=campaign-lead-count]')
          .contains(campaignArr[idx].totalLeads);
        cy.wrap($item)
          .find('[data-test=campaign-priority-count]')
          .contains(campaignArr[idx].priorityCount);
      });
    });
  });

  it('navigates to the correct campaign page after clicking on it, navigates back after clicking back button', () => {
    let counter = 0;
    cy.getState().then(({ campaigns }) => {
      const campaignArr = Object.values(campaigns.campaigns);
      cy.get(itemLink).then($link => {
        counter = $link.length;
        for (let i = 0; i < counter; i++) {
          cy.get(itemLink)
            .eq(i)
            .click({ force: true });
          cy.location().should(location => {
            expect(location.pathname).to.eq(`/${campaignUrl}/${campaignArr[i].id}/details`);
          });
          cy.get('[data-test=tabbed-header] button').click({ force: true });
          cy.location().should(location => {
            expect(location.pathname).to.eq(`/${campaignUrl}`);
          });
        }
      });
    });
  });

  it('archives the last campaign and archive persists across page reloads', () => {
    cy.server();
    cy.route({ method: 'GET', url: '**/campaigns/**' }).as('campaigns');
    cy.get(`${itemHeader} h5`).then($headers => {
      cy.get('[data-test=swipeable-list-item-action] a').then($links => {
        let linkLength = $links.length;
        cy.wrap($links)
          .last()
          .click({ force: true });
        cy.wrap($links)
          .last()
          .should('not.exist');
        cy.login();
        cy.visit(`${url}/${campaignUrl}`);
        cy.wait('@campaigns').then(() => {
          cy.get('[data-test=swipeable-list-item-action] a').then($updatedA => {
            expect($updatedA.length).to.eq(linkLength - 1);
          });
          cy.get(`${itemHeader} h5`).each($newHeader => {
            const lastCampaign = $headers[$headers.length - 1];
            cy.wrap($newHeader).should('not.contain', lastCampaign.textContent);
          });
        });
      });
    });
  });
});
