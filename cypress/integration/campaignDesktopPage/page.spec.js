describe('Campaign Desktop Page', () => {
  const url = Cypress.env('clientUrl');
  const campaignPath = `${url}/campaigns/`

  it('loads campaigns desktop page and has the active tab selected ', () => {
    cy.viewport(950, 800)
    cy.login();
    cy.visit(campaignPath);
    cy
      .get('[data-test=campaign-filter-tabs]')
      .children()
      .next()
      .should('have.class', 'active');
  });

  it('loads campaigns list', () => {
    cy.viewport(950, 800);
    cy.login();

    cy.server();
    cy.route({ method: 'GET', url: '**/campaigns/**' }).as('campaigns');
    cy.visit(campaignPath);
    cy.wait('@campaigns');

    cy
      .getState()
      .then(store => {
        const { campaigns: { campaigns } } = store;

        cy
          .get('[data-test=list-item]')
          .parent()
          .children()
          .should('have.length', Object.keys(campaigns).length);
      });
  });

  // chains off the previous one
  it('shows loading spinner when switching to new tab', () => {
    cy.viewport(950, 800);
    cy.server();
    cy.route({ method: 'GET', url: '**/campaigns/**' }).as('campaigns');

    cy
      .get('[data-test=campaign-filter-tabs]')
      .children()
      .first()
      .click()

    cy.wait('@campaigns')

    cy
      .getState()
      .then(store => {
        const { uiStore: { campaignsPageDesktopView: { campaignsList: { filterData: { tabs } } } } } = store;
        assert.isAbove(tabs.all.sortOrder.length, 0);
      })
  });

  it('switches sorting options and checks if success call', () => {
    cy.viewport(950, 800);
    cy.server();
    cy.route({ method: 'GET', url: '**/campaigns/**' }).as('campaigns');

    cy
      .getState()
      .then(state => {
        const { uiStore: { campaignsPageDesktopView: { campaignsList: { filterData: { tabs } } } } } = state;
        cy
          .get('[data-test=filter-campaigns-select]')
          .select('Oldest')

        cy
          .wait('@campaigns')
          .then(response => {
            assert.equal(response.status, 200);
          });

        cy
          .getState()
          .then(nextState => {
            const {
              uiStore: {
                campaignsPageDesktopView: { campaignsList: { filterData: { tabs: { all } } } }
              }
            } = nextState;

            console.log("BOOOOM", all.sortedBy, tabs.all.sortedBy);
            assert.notEqual(all.sortedBy, tabs.all.sortedBy);
          });
      });
  });
});
