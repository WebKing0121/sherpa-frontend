// import { uiGetCampaigns } from '../../../src/store/uiStore/campaignsPageDesktopView/campaignsList/filterData/selectors';

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

            assert.notEqual(all.sortedBy, tabs.all.sortedBy);
          });
      });
  });

  it('Archives a campaign', () => {
    cy.viewport(950, 800);
    cy.server();
    cy.route({ method: 'PUT', url: '**/campaigns/*/**' }).as('campaigns');
    cy.route({ method: 'GET', url: '**/campaigns/**' }).as('campaigns2');

    cy
      .get('[data-test=campaign-filter-tabs]')
      .children()
      .next()
      .first()
      .click();

    cy.wait('@campaigns2');

    cy
      .getState()
      .then(data => {
        const {
          uiStore: {
            campaignsPageDesktopView: { campaignsList: { filterData: { tabs: { active } } } }
          }
        } = data;

        cy
          .get(`[data-test=kebab-${active.sortOrder[0]}]`)
          .click();
        cy
          .get('[data-test=Archive]')
          .click()

        cy.wait('@campaigns');

        cy
          .getState()
          .then(data2 => {
            const {
              uiStore: {
                campaignsPageDesktopView: { campaignsList: { filterData: { tabs: { active: active2 } } } }
              }
            } = data2;

            assert.equal(active.sortOrder.length, active2.sortOrder.length + 1);
          })
      });
  })

  it('UnArchives a Campaigns', () => {
    cy.viewport(950, 800);
    cy.server();
    cy.route({ method: 'PUT', url: '**/campaigns/*/**' }).as('campaigns');
    cy.route({ method: 'GET', url: '**/campaigns/**' }).as('campaigns2');

    cy
      .get('[data-test=campaign-filter-tabs]')
      .children()
      .last()
      .click();

    cy.wait('@campaigns2');

    cy
      .getState()
      .then(data => {
        const {
          uiStore: {
            campaignsPageDesktopView: { campaignsList: { filterData: { tabs: { archived } } } }
          }
        } = data;

        cy
          .get(`[data-test=kebab-${archived.sortOrder[0]}]`)
          .click();
        cy
          .get('[data-test=Un-Archive]')
          .click()

        cy.wait('@campaigns');

        cy
          .getState()
          .then(data2 => {
            const {
              uiStore: {
                campaignsPageDesktopView: { campaignsList: { filterData: { tabs: { archived: archived2 } } } }
              }
            } = data2;

            assert.equal(archived.sortOrder.length, archived2.sortOrder.length + 1);
          })
      });
  })
});
