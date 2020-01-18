describe('campaign messages', () => {
  const url = Cypress.env('clientUrl'),
    marketId = Cypress.env('testCampaign'),
    campaignId = Cypress.env('testCampaign'),
    campaignUrl = `markets/${marketId}/campaigns/${campaignId}/details`,
    swipeableListItem = '[data-test=swipeable-list-item]',
    dropDown = '[data-test=campaign-messages-filter]';

  const actions = ['Verified', 'DNC', 'Priority', 'Qualified'];

  before(() => {
    cy.login();
  });

  function createUpdatedfixture() {
    cy.fixture(`campaign${campaignId}Prospects`).then(fixture => {
      const newProperties = {
        isPriority: true,
        isQualifiedLead: false,
        ownerVerifiedStatus: 'unverified',
        doNotCall: false
      };
      const updatedFixture = { ...fixture };
      const { prospect } = updatedFixture.results[0];
      updatedFixture.results[0].prospect = { ...prospect, ...newProperties };
      cy.writeFile(`cypress/fixtures/campaign${campaignId}ProspectsUpdated.json`, { ...updatedFixture });
    });
  }

  it('renders the messages tab', () => {
    createUpdatedfixture();
    cy.server();
    const loadMessagesAndWait = resAlias => {
      cy.visit(`${url}/${campaignUrl}`);
      cy.wait(resAlias);
    };
    cy.stubResponse(
      { method: 'GET', url: 'campaign-prospects', response: `campaign${campaignId}ProspectsUpdated` },
      loadMessagesAndWait
    );
    cy.get('[data-test=Messages]').contains('Messages');
  });

  it('selects the messages tab and renders the messages pane', () => {
    cy.get('[data-test=Messages]').click({ force: true });
    cy.get('[data-test=Messages]').should('have.class', 'active');
    cy.get(dropDown).should('exist');
  });

  it('has the first option in the filter dropdown selected', () => {
    cy.get(dropDown)
      .find('select')
      .then($select => {
        cy.get(dropDown)
          .find('option')
          .then($option => {
            cy.wrap($select).should('have.value', $option[1].value);
          });
      });
  });

  it('selects each option', () => {
    cy.server();
    cy.stubResponse({
      method: 'GET',
      url: 'campaign-prospects',
      response: `campaign${campaignId}ProspectsUpdated`
    });
    cy.get(dropDown)
      .find('option')
      .each($option => {
        if ($option[0].value >= 0) {
          cy.get(dropDown)
            .find('select')
            .select($option[0].value)
            .should('have.value', $option[0].value);
        }
      });
    cy.get(dropDown)
      .find('select')
      .select('Unread / Is Priority');
  });

  it('contains each action button with the correct text and an icon', () => {
    cy.get('[data-test=swipeable-list-item]')
      .first()
      .find('[data-test=swipeable-list-item-action]')
      .then($actions => {
        cy.wrap($actions).should('have.length', 4);
        cy.wrap($actions).each(($button, idx) => {
          cy.wrap($button)
            .find('img')
            .should('exist');
          cy.wrap($button)
            .find('a')
            .contains(actions[idx]);
        });
      });
  });

  it('displays the correct info', () => {
    cy.fixture(`campaign${campaignId}Prospects`).then(campaignProspect => {
      cy.get(swipeableListItem).each(($item, idx) => {
        const {
          name,
          displayMessage: { message }
        } = campaignProspect.results[idx].prospect;
        cy.get($item)
          .find('time')
          .should('exist');
        cy.get($item)
          .find('h5')
          .contains(name);
        cy.get('[data-test=list-item-sub-info]')
          .find('span')
          .should('exist');
        cy.get('[data-test=list-item-main-info]')
          .find('span')
          .contains(message);
      });
    });
  });

  it('clicks the action button and completes the appropriate action', () => {
    cy.get('[data-test=Messages]').click({ force: true });
    cy.get('[data-test=swipeable-list-item]')
      .first()
      .within(() => {
        cy.get('[data-test=swipeable-list-item-action]').each($button => {
          cy.wrap($button).click({ force: true });
        });
        cy.get('[data-test=list-item-header]')
          .find('a')
          .click({ force: true });
      });
    cy.fixture(`campaign${campaignId}Prospects`).then(fixture => {
      const {
        isPriority,
        isQualifiedLead,
        doNotCall,
        ownerVerifiedStatus
      } = fixture.results[0].prospect;
      cy.get('[data-test=status-action-button]').then($buttons => {
        // if button background color is while, status is not active.  Should be opposite of status in fixture
        cy.wrap($buttons[0])
          .should('have.css', 'background-color')
          .and(ownerVerifiedStatus !== 'verified' ? 'not.eq' : 'eq', 'rgb(255, 255, 255)');
        cy.wrap($buttons[1])
          .should('have.css', 'background-color')
          .and(!doNotCall ? 'not.eq' : 'eq', 'rgb(255, 255, 255)');
        cy.wrap($buttons[2])
          .should('have.css', 'background-color')
          .and(!isPriority ? 'not.eq' : 'eq', 'rgb(255, 255, 255)');
        cy.wrap($buttons[3])
          .should('have.css', 'background-color')
          .and(!isQualifiedLead ? 'not.eq' : 'eq', 'rgb(255, 255, 255)');
        // reseting status buttons
        cy.wrap($buttons).each($btn => cy.wrap($btn[0]).click({ force: true }));
      });
    });
  });

  function setNewFixtureAndLoadPage(bool) {
    cy.fixture(`campaign${campaignId}ProspectsUpdated`).then(fixture => {
      const newFixture = { ...fixture };
      newFixture.results[0].hasUnreadSms = bool;
      cy.visit(`${url}/${campaignUrl}`);
      cy.reload();
      cy.login();
      cy.server();
      cy.route('**/campaign-prospects/**', newFixture).as('updated-campaign-prospects');
      cy.visit(`${url}/${campaignUrl}`);
      cy.wait('@updated-campaign-prospects');
      cy.get('[data-test=Messages]').click({ force: true });
    });
  }

  it('does not render a bold name or icons if there are no unread messages', () => {
    setNewFixtureAndLoadPage(false);
    cy.get('[data-test=unread-messages-indicator]').should('not.exist');
    cy.get('[data-test=list-item-header] h5 span')
      .should('have.css', 'font-weight')
      .and('not.gt', 500);
  });

  it('renders a bold name and an icons if there are unread messages', () => {
    setNewFixtureAndLoadPage(true);
    cy.get('[data-test=unread-messages-indicator]').should('exist');
    cy.get('[data-test=list-item-header] h5 span')
      .should('have.css', 'font-weight')
      .and('gt', 500);
  });

  // it('displays the correct ');

  // it('swipes prospect element left', () => {
  //   cy.get('[data-test=swipeable-list-item]')
  //     .find('.ListItem')
  //     .then($item => {
  //       console.log($item[0]);
  //       cy.wrap($item[0])
  //         .trigger('pointerdown', { which: 1, force: true })
  //         .trigger('pointermove', { clientX: 0, force: true })
  //         .trigger('pointerup', { force: true });
  //     });
  // });

  it('renders the correct page after selecting the prospect and then goes back to the campaign prospects page when clicking back button', () => {
    cy.fixture(`campaign${campaignId}Prospects`).then(campaignProspect => {
      cy.get(swipeableListItem).then($item => {
        const { id } = campaignProspect.results[0];
        cy.get($item)
          .find('[data-test=list-item-link]')
          .first()
          .click({ force: true, multiple: true });
        cy.location().should(location => {
          expect(location.pathname).to.eq(`/prospect/${id}/details`);
        });
        cy.get('[data-test=tabbed-header]')
          .find('button')
          .click({ force: true });
        cy.location().should(location => {
          expect(location.pathname).to.eq(`/${campaignUrl}`);
        });
      });
    });
  });
});
