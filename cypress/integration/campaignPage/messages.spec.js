describe('campaign messages', () => {
  const url = Cypress.env('clientUrl'),
    marketId = Cypress.env('testMarket'),
    campaignId = Cypress.env('testCampaign'),
    campaignUrl = `markets/${marketId}/campaigns/${campaignId}/details`,
    swipeableListItem = '[data-test=swipeable-list-item]',
    messagesFilter = '[data-test=campaign-messages-filter]',
    option = '.dropdown-item',
    dropDown = '[data-test=custom-dropdown]',
    dropDownValue = '.dropdown span';

  const actions = ['Verified', 'DNC', 'Priority', 'Qualified'];

  before(() => {
    cy.login();
    cy.createFixture(`campaign${campaignId}Prospects.json`, `campaign-prospects`, 'GET', {
      qs: { expand: 'campaign', page_size: 20, campaign: campaignId, is_priority_unread: true }
    });
  });

  it('renders the messages tab', () => {
    cy.server();
    cy.fixture(`campaign${campaignId}Prospects`).then(fixture => {
      cy.route({
        method: 'GET',
        url: '**/campaign-prospects/*',
        response: fixture
      }).as('campaign-prospects');
      cy.visit(`${url}/${campaignUrl}`);
      cy.wait(`@campaign-prospects`);
      cy.get('[data-test=Messages]').contains('Messages');
    });
  });

  it('selects the messages tab and renders the messages pane', () => {
    cy.get('[data-test=Messages]').click({ force: true });
    cy.get('[data-test=Messages]').should('have.class', 'active');
    cy.get(messagesFilter).should('exist');
  });

  it('has the first option in the filter dropdown selected', () => {
    cy.get(messagesFilter)
      .find(dropDownValue)
      .then($select => {
        cy.get(messagesFilter)
          .find(option)
          .then($option => {
            cy.wrap($select).contains($option[0].textContent);
          });
      });
  });

  it('selects each option and receives xhr status code 200', () => {
    cy.server();
    cy.fixture(`campaign${campaignId}Prospects`).then(fixture => {
      cy.route({
        method: 'GET',
        url: '**/campaign-prospects/**',
        response: fixture
      }).as('campaign-prospects');
      cy.get(messagesFilter)
        .find(option)
        .then($options => {
          console.log($options)
          const optionsLen = $options.length;
          for (let i = 0; i < optionsLen; i++) {
            cy.get(messagesFilter).click({ force: true })
            cy.get(messagesFilter).find(option).eq(i).click({ force: true })
            cy.wait('@campaign-prospects').then(xhr => {
              cy.wrap(xhr)
                .its('status')
                .should('eq', 200);
            });
          }
        });
    })
    cy.get(messagesFilter)
      .find(option).first().click({ force: true })
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
    cy.server();
    cy.route({ method: 'PATCH', url: '**/prospects/**' }).as('action');
    cy.get('[data-test=Messages]').click({ force: true });
    cy.get('[data-test=swipeable-list-item]')
      .first()
      .children()
      .first()
      .within(() => {
        cy.get('[data-test=swipeable-list-item-action]').each($button => {
	  if ($button[0].innerText.trim() !== "DNC") {
	    console.log("CLICK", $button[0].innerText);
	    cy.wrap($button)
              .within(() => {
		cy.get('a')
                  .click({ force: true })
              })
	  }
        });
      });
    cy.wait('@action');
    cy.get('[data-test=list-item-header]')
      .find('a')
      .first()
      .click({ force: true });
    // must use original fixture, NOT updated fixture to compare prospect status to original
    cy.fixture(`campaign${campaignId}Prospects`).then(fixture => {
      const {
        isPriority,
        isQualifiedLead,
        doNotCall,
        ownerVerifiedStatus
      } = fixture.results[0].prospect;
      const white = 'rgb(255, 255, 255)';
      cy.get('[data-test=status-action-button]').then($buttons => {
        // if button background color is while, status is not active.  Should be opposite of status in fixture
        cy.wrap($buttons[0])
          .should('have.css', 'background-color')
          .and(ownerVerifiedStatus !== 'verified' ? 'not.eq' : 'eq', white);
        cy.wrap($buttons[2])
          .should('have.css', 'background-color')
          .and(!isPriority ? 'not.eq' : 'eq', white);
        cy.wrap($buttons[3])
          .should('have.css', 'background-color')
          .and(!isQualifiedLead ? 'not.eq' : 'eq', white);
        // reseting status buttons
        cy.wrap($buttons).each($btn => {
	  if ($btn[0].innerText.trim() !== "DNC") {
	    cy.wrap($btn[0]).click({ force: true })
	  }
	});
      });
    });
  });

  // changes the "hasUnreadSms" property and reloads app
  function setNewFixtureAndLoadPage(bool) {
    cy.fixture(`campaign${campaignId}Prospects`).then(fixture => {
      fixture.results.forEach(prospect => {
        prospect.hasUnreadSms = bool;
      });
      cy.visit(`${url}/${campaignUrl}`);
      cy.reload();
      cy.login();
      cy.server();
      cy.route({ url: '**/campaign-prospects/*', response: fixture }).as('updated-campaign-prospects');
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
