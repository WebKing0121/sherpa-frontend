describe('Prospect details tab', () => {
  const url = Cypress.env('clientUrl'),
    prospectId = Cypress.env('testProspect'),
    prospectUrl = `prospect/${prospectId}/details`,
    leadStagesDropDown = '[data-test=prospect-lead-stages-drop-down]',
    agentDropDown = '[data-test=agent-drop-down]',
    smsRelayDropDown = '[data-test=sms-relay-drop-down]',
    dateTime = '[data-test=reminder-date-picker]',
    crmBtn = '[data-test=email-to-crm-btn',
    zapierBtn = '[data-test=push-to-zapier-btn]',
    actionButtons = '[data-test=status-action-button]';

  const actions = ['Verified', 'DNC', 'Priority', 'Qualified'];

  before(() => {
    cy.login();
    cy.createFixture(`prospect${prospectId}Details.json`, `prospects/${prospectId}`, 'GET', {
      qs: { expand: 'campaigns', sms_relay_map: 'sms_relay_map' }
    });
  });

  it('renders the details tab', () => {
    cy.server();
    cy.stubResponse({
      method: 'GET',
      url: `prospects/${prospectId}/*`,
      response: `prospect${prospectId}Details`
    }).then(res => {
      cy.visit(`${url}/${prospectUrl}`);
      cy.wait(`@${res.alias}`);
    });
    cy.get('[data-test=Details]').click({ force: true });
    cy.get('[data-test=Details]').should('have.class', 'active');
  });

  it('has the correct lead stages status selected in the dropdown', () => {
    cy.fixture(`prospect${prospectId}Details`).then(fixture => {
      cy.get(leadStagesDropDown).should('have.value', `${fixture.leadStage}`);
    });
  });

  it('contains all lead stages options in the dropdown', () => {
    cy.getState().then(state => {
      const { leadStages } = state.leadStages;
      cy.get(leadStagesDropDown)
        .find('option')
        .then($options => {
          const firstOption = $options[0].value;
          // removing empty drop down option from array because it will not match any leadstages option
          const optionsClone = $options.slice(firstOption ? 0 : 1);
          expect(optionsClone.length).to.eq(leadStages.length);
          cy.wrap(optionsClone).each(($option, idx) => {
            cy.wrap($option).should('have.value', `${leadStages[idx].id}`);
          });
        });
    });
  });

  it('clicks each action button, displays loading spinner while request is processing, removes spinner after processing, has valid response with correct payload when toggling', () => {
    cy.server();
    cy.route({ method: 'PATCH', url: `**/prospects/${prospectId}/**` }).as('prospect');

    const actions = ['ownerVerifiedStatus', 'doNotCall', 'isPriority', 'isQualifiedLead'];
    const prospectStatus = {};

    cy.get(actionButtons).each(($button, idx) => {
      cy.wrap($button).click({ force: true });
      cy.wrap($button)
        .find('[data-test=loading-spinner]')
        .should('exist');
      cy.wait('@prospect').then(xhr => {
        cy.wrap($button)
          .find('[data-test=loading-spinner]')
          .should('not.exist');
        cy.wrap(xhr)
          .its('status')
          .should('eq', 200);

        const currentAction = actions[idx],
          reqStatus = xhr.request.body[currentAction],
          resStatus = xhr.response.body[currentAction];

        prospectStatus[currentAction] = reqStatus;

        expect(reqStatus).to.eq(resStatus);
      });
      // should toggle back previous state
      cy.wrap($button).click({ force: true });
      cy.wait('@prospect').then(xhr => {
        cy.wrap(xhr)
          .its('status')
          .should('eq', 200);

        const currentAction = actions[idx],
          resStatus = xhr.response.body[currentAction];

        if (currentAction === 'ownerVerifiedStatus') {
          if (prospectStatus[currentAction] === 'verified') {
            expect(resStatus).to.eq('unverified');
          } else {
            expect(resStatus).to.eq('verified');
          }
        } else {
          expect(resStatus).to.eq(!prospectStatus[currentAction]);
        }
      });
    });
  });

  it('has the correct agents in the agent selector, selects each option, and clears the selection', () => {
    cy.getState().then(({ auth }) => {
      cy.get(agentDropDown).then($dropDown => {
        cy.wrap($dropDown)
          .find('option')
          .then($agents => {
            cy.server();
            cy.route({ url: `**/prospects/${prospectId}`, method: 'PATCH' }).as('prospect');
            const firstOption = $agents[0].value;
            const agentsCopy = $agents.slice(!firstOption ? 1 : 0);
            cy.wrap(agentsCopy).each(($agent, idx) => {
              const owner = auth.userData.company.profiles[idx].user;
              if (owner.fullName) {
                cy.wrap($agent).contains(owner.fullName);
              }
              cy.wrap($dropDown).select($agent[0].value);
              cy.wrap($dropDown).should('have.value', $agent[0].value);
              cy.wait('@prospect').then(xhr => {
                expect(xhr.status).to.eq(200);
              });
            });
          });
      });
      const owner = auth.userData.company.profiles;
      cy.get(agentDropDown).should('have.value', `${owner[owner.length - 1].user.id}`);
      cy.get(agentDropDown).then($dropDown => {
        cy.wrap($dropDown)
          .find('option')
          .first()
          .then($option => {
            cy.wrap($dropDown).select($option[0].value);
            cy.wrap($dropDown).should('have.value', $option[0].value);
          });
      });
    });
  });

  // it('displays the sms relay selector if the prospect has a sherpa number', () => {
  //   cy.get(smsRelayDropDown).should('exist');
  // });

  // it('has the correct users in the sms relay selector', () => {
  //   cy.getState().then(({ auth }) => {
  //     cy.get(smsRelayDropDown).then($dropDown => {
  //       cy.wrap($dropDown)
  //         .find('option')
  //         .then($owners => {
  //           cy.server();
  //           cy.route({ url: `**/sms-relay-maps`, method: 'POST' }).as('sms-relay-maps');
  //           const firstOption = $owners[0].value;
  //           const ownersCopy = $owners.slice(!firstOption ? 1 : 0);
  //           cy.wrap(ownersCopy).each(($owner, idx) => {
  //             const owner = auth.userData.company.profiles[idx].user;
  //             if (owner.fullName) {
  //               cy.wrap($owner).contains(owner.fullName);
  //             }
  //             cy.wrap($dropDown).select($owner[0].value);
  //             cy.wrap($dropDown).should('have.value', $owner[0].value);
  //             cy.wait('@sms-relay-maps').then(xhr => {
  //               expect(xhr.status).to.eq(200);
  //             });
  //           });
  //         });
  //     });
  //   });
  // });

  it('displays the date picker component', () => {
    cy.get(dateTime).should('exist');
  });

  it('picks a date, receives a status code 200 and the correct response', () => {
    cy.server();
    cy.route({ url: `**/prospects/${prospectId}/set_reminder`, method: 'POST' }).as('set-reminder');
    cy.get(dateTime).click({ force: true });
    cy.get('.rdt')
      .find(`tbody`)
      .then($tbody => {
        cy.wrap($tbody)
          .find('td')
          .last()
          .then($td => {
            cy.wrap($td).click({ force: true });
          });
      });
    cy.get('.modalBackPlate').click({ force: true });
    cy.wait('@set-reminder').then(xhr => {
      const reqDate = xhr.request.body.time,
        resDate = xhr.response.body.reminderDateUtc,
        status = xhr.status;
      expect(status).to.be.gte(200);
      expect(resDate).to.eq(reqDate);
    });
  });

  it('displays sent state for "Email to CRM" button if prospect has been sent to CRM', () => {
    cy.login();
    cy.fixture(`prospect${prospectId}Details`).then(fixture => {
      fixture.emailedToPodio = true;
      cy.server();
      cy.route({
        method: 'GET',
        url: `**/prospects/${prospectId}/*`,
        response: fixture
      }).as('prospect-details');
      cy.visit(`${url}/${prospectUrl}`);
      cy.wait('@prospect-details');
      cy.get(crmBtn).should('be.disabled');
    });
  });

  it('Email to CRM button is disabled if there is no campaign email', () => {
    cy.login();
    cy.fixture(`prospect${prospectId}Details`).then(fixture => {
      fixture.campaigns[0].podioPushEmailAddress = '';
      cy.server();
      cy.route({
        method: 'GET',
        url: `**/prospects/${prospectId}/*`,
        response: fixture
      }).as('prospect-details');
      cy.visit(`${url}/${prospectUrl}`);
      cy.wait('@prospect-details');
      cy.get(crmBtn).should('be.disabled');
    });
  });

  it('Clicks email to CRM button, displays a loading spinner, and receives a valid response and status of 200', () => {
    cy.login();
    cy.visit(`${url}/${prospectUrl}`);
    cy.server();
    cy.route({ url: `**/prospects/${prospectId}/email_to_podio/`, method: 'POST', response: [] }).as(
      'email-podio'
    );
    cy.get(crmBtn).click({ force: true });
    cy.get(crmBtn)
      .find('[data-test=loading-spinner]')
      .should('exist');
    cy.wait('@email-podio').then(xhr => {
      cy.get(crmBtn)
        .find('[data-test=loading-spinner]')
        .should('not.exist');
      expect(xhr.status).to.be.gte(200);
    });
  });

  it('displays sent state for "Push to Zapier" button if prospect has been pushed to zapier', () => {
    cy.login();
    cy.fixture(`prospect${prospectId}Details`).then(fixture => {
      fixture.pushedToZapier = true;
      cy.server();
      cy.route({
        method: 'GET',
        url: `**/prospects/${prospectId}/*`,
        response: fixture
      }).as('prospect-details');
      cy.visit(`${url}/${prospectUrl}`);
      cy.wait('@prospect-details');
      cy.get(zapierBtn).should('be.disabled');
    });
  });

  it('Push to zapier button is disabled if there is no campaign zapier webhook', () => {
    cy.login();
    cy.fixture(`prospect${prospectId}Details`).then(fixture => {
      fixture.campaigns[0].zapierWebhook = null;
      cy.server();
      cy.route({
        method: 'GET',
        url: `**/prospects/${prospectId}/*`,
        response: fixture
      }).as('prospect-details');
      cy.visit(`${url}/${prospectUrl}`);
      cy.wait('@prospect-details');
      cy.get(zapierBtn).should('be.disabled');
    });
  });

  it('Clicks push to zapier button, displays a loading spinner, and receives a valid response and status of 200', () => {
    cy.login();
    cy.visit(`${url}/${prospectUrl}`);
    cy.server();
    cy.route({ url: `**/prospects/${prospectId}/push_to_zapier/`, method: 'POST', response: [] }).as(
      'push-zapier'
    );
    cy.get(zapierBtn).click({ force: true });
    cy.get(zapierBtn)
      .find('[data-test=loading-spinner]')
      .should('exist');
    cy.wait('@push-zapier').then(xhr => {
      cy.get(zapierBtn)
        .find('[data-test=loading-spinner]')
        .should('not.exist');
      expect(xhr.status).to.be.gte(200);
    });
  });
});
