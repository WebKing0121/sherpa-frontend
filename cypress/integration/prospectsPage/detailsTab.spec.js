describe('campaign messages', () => {
  const url = Cypress.env('clientUrl'),
    prospectId = Cypress.env('testProspect'),
    prospectUrl = `prospect/${prospectId}/details`,
    leadStagesDropDown = '[data-test=prospect-lead-stages-drop-down]',
    agentDropDown = '[data-test=agent-drop-down]',
    smsRelayDropDown = '[data-test=sms-relay-drop-down]',
    actionButtons = '[data-test=status-action-button]';

  const actions = ['Verified', 'DNC', 'Priority', 'Qualified'];

  before(() => {
    cy.login();
    cy.createFixture(`prospect${prospectId}Details.json`, `prospects/${prospectId}`, 'GET', {
      qs: { expand: 'campaigns', sms_relay_map: 'sms_relay_map' }
    });
  });

  it('renders the messages tab', () => {
    cy.server();
    const loadMessagesAndWait = resAlias => {
      cy.visit(`${url}/${prospectUrl}`);
      cy.wait(resAlias);
    };
    cy.stubResponse(
      { method: 'GET', url: `prospects/${prospectId}`, response: `prospect${prospectId}Details` },
      loadMessagesAndWait
    );
    cy.get('[data-test=Details]').contains('Details');
  });

  it('selects the details tab and renders the details pane', () => {
    cy.get('[data-test=Details]').click({ force: true });
    cy.get('[data-test=Details]').should('have.class', 'active');
    cy.get(leadStagesDropDown).should('exist');
  });

  it('has the first option in the filter selected', () => {
    cy.get(leadStagesDropDown).select('Initial Message Sent');
    cy.get(leadStagesDropDown).then($leadStagesDropDown => {
      cy.wrap($leadStagesDropDown)
        .find('option')
        .then($option => {
          cy.wrap($leadStagesDropDown).should('have.value', $option[0].value);
        });
    });
  });

  it('selects each lead stages drop down option', () => {
    cy.server();
    cy.stubResponse({
      method: 'PATCH',
      url: `prospects/${prospectId}`,
      response: `prospect${prospectId}Details`
    }).then(res => {
      cy.get(leadStagesDropDown)
        .find('option')
        .each($option => {
          if ($option[0].value >= 0) {
            cy.get(leadStagesDropDown)
              .select($option[0].value)
              .should('have.value', $option[0].value);
            cy.wait(`@${res.alias}`).then(xhr => {
              cy.wrap(xhr)
                .its('status')
                .should('eq', 200);
            });
          }
        });
    });
    cy.get(leadStagesDropDown).select('Initial Message Sent');
  });

  it('contains each action button with the correct text and an icon', () => {
    cy.get(actionButtons).then($actions => {
      cy.wrap($actions).should('have.length', 4);
      cy.wrap($actions).each(($button, idx) => {
        cy.wrap($button)
          .find('svg')
          .should('exist');
        cy.wrap($button).contains(actions[idx]);
      });
    });
  });

  it('displays a loading spinner, have an xhr status 200, and have the correct state after clicking an action button', () => {
    cy.server();
    cy.route({ method: 'PATCH', url: `**/prospects/${prospectId}/**` }).as('prospect');
    cy.get(actionButtons).each($button => {
      cy.wrap($button).click({ force: true });
      cy.wrap($button)
        .find('[data-test=loading-spinner]')
        .should('exist');
      cy.wait('@prospect').then(xhr =>
        cy
          .wrap(xhr)
          .its('status')
          .should('eq', 200)
      );
    });
    cy.fixture(`prospect${prospectId}Details`).then(fixture => {
      const { isPriority, isQualifiedLead, doNotCall, ownerVerifiedStatus } = fixture;
      const white = 'rgb(255, 255, 255)';
      cy.get('[data-test=status-action-button]').then($buttons => {
        // if button background color is while, status is not active.  Should be opposite of status in fixture
        cy.wrap($buttons[0])
          .should('have.css', 'background-color')
          .and(ownerVerifiedStatus !== 'verified' ? 'not.eq' : 'eq', white);
        cy.wrap($buttons[1])
          .should('have.css', 'background-color')
          .and(!doNotCall ? 'not.eq' : 'eq', white);
        cy.wrap($buttons[2])
          .should('have.css', 'background-color')
          .and(!isPriority ? 'not.eq' : 'eq', white);
        cy.wrap($buttons[3])
          .should('have.css', 'background-color')
          .and(!isQualifiedLead ? 'not.eq' : 'eq', white);
      });
    });
  });

  it('has persistent leadstages status after reload', () => {
    cy.reload();
    cy.login();
    cy.server();
    cy.route({ method: 'GET', url: `**/prospects/${prospectId}/**` }).as('prospect');
    cy.visit(`${url}/${prospectUrl}`);
    cy.wait('@prospect');
    cy.get('[data-test=Details]').click({ force: true });
    cy.fixture(`prospect${prospectId}Details`).then(fixture => {
      const { isPriority, isQualifiedLead, doNotCall, ownerVerifiedStatus } = fixture;
      const white = 'rgb(255, 255, 255)';
      cy.get('[data-test=status-action-button]').then($buttons => {
        // if button background color is while, status is not active.  Should be opposite of status in fixture
        cy.wrap($buttons[0])
          .should('have.css', 'background-color')
          .and(ownerVerifiedStatus !== 'verified' ? 'not.eq' : 'eq', white);
        cy.wrap($buttons[1])
          .should('have.css', 'background-color')
          .and(!doNotCall ? 'not.eq' : 'eq', white);
        cy.wrap($buttons[2])
          .should('have.css', 'background-color')
          .and(!isPriority ? 'not.eq' : 'eq', white);
        cy.wrap($buttons[3])
          .should('have.css', 'background-color')
          .and(!isQualifiedLead ? 'not.eq' : 'eq', white);
      });
    });
  });

  it('display the agent drop down, selects each option, and gets an xhr status of 200', () => {
    cy.get(agentDropDown).then($dropDown => {
      cy.wrap($dropDown).should('exist');
      cy.server();
      cy.stubResponse({
        method: 'PATCH',
        url: `prospects/${prospectId}`,
        response: `prospect${prospectId}Details`
      }).then(res => {
        cy.wrap($dropDown)
          .find('option')
          .each($option => {
            if ($option[0].value >= 0) {
              cy.get(agentDropDown)
                .select($option[0].value)
                .should('have.value', $option[0].value);
              cy.wait(`@${res.alias}`).then(xhr => {
                cy.wrap(xhr)
                  .its('status')
                  .should('eq', 200);
              });
            }
          });
      });
    });
  });
  it('display the SMS & Call Relay drop down, selects each option, and gets an xhr status of 200', () => {
    cy.get(smsRelayDropDown).then($dropDown => {
      cy.wrap($dropDown).should('exist');
      cy.server();
      cy.stubResponse({
        method: 'POST',
        url: `sms-relay-maps`,
        response: `smsRelayMaps`
      }).then(res => {
        cy.wrap($dropDown)
          .find('option')
          .each($option => {
            if ($option[0].value >= 0) {
              cy.get(smsRelayDropDown)
                .select($option[0].value)
                .should('have.value', $option[0].value);
              cy.wait(`@${res.alias}`).then(xhr => {
                cy.wrap(xhr)
                  .its('status')
                  .should('eq', 200);
              });
            }
          });
      });
    });
  });
});
