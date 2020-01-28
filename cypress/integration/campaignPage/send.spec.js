describe('campaign send tab', () => {
  const url = Cypress.env('clientUrl'),
    marketId = Cypress.env('testMarket'),
    campaignId = Cypress.env('testCampaign'),
    campaignUrl = `markets/${marketId}/campaigns/${campaignId}/details`,
    sendTab = '[data-test=Send]',
    smsTemplateDropDown = '[data-test=sms-template-drop-down]';

  before(() => {
    cy.login();
    cy.createFixture(`campaigns.json`, `campaigns`, 'GET', {
      qs: { market: marketId, ordering: '-created', is_archived: false }
    });
    cy.createFixture(`batchTemplates${campaignId}.json`, `campaigns/${campaignId}/batch_prospects`);
  });

  it('navigates to the correct screen', () => {
    cy.stubResponse({
      url: `campaigns/*`,
      method: 'GET',
      response: `campaigns`
    }).then(res => {
      cy.visit(`${url}/${campaignUrl}`);
      cy.wait(`@${res.alias}`);
      cy.location().should(location => {
        expect(location.pathname).to.eq(`/${campaignUrl}`);
      });
    });
  });

  it('selects and highlights the send tab', () => {
    cy.get(sendTab).click({ force: true });
    cy.get(sendTab).should('have.class', 'active');
  });

  it('populates the templates drop down', () => {
    cy.getState().then(({ smsTemplates: { templates } }) => {
      const templatesArr = Object.values(templates);
      cy.get(smsTemplateDropDown)
        .find('option')
        .each(($option, idx) => {
          cy.wrap($option).contains(templatesArr[idx].templateName);
        });
    });
  });

  it('displays the correct preview message on load', () => {
    cy.fixture(`campaigns`).then(fixture => {
      const campaign = fixture.results.reduce((acc, curr) => {
        acc[curr.id] = curr;
        return acc;
      }, {});
      console.log(campaign);
      cy.getState().then(({ smsTemplates: { templates } }) => {
        const { message } = templates[campaign[campaignId].smsTemplate];
        cy.get('[data-test=sms-template-preview]').contains(message);
      });
    });
  });

  it('displays the correct preview message and full message after changing template', () => {
    cy.server();
    // cy.route({ url: `**/campaigns/*`, method: 'GET' });
    cy.route({ url: `**/campaigns/${campaignId}/batch_prospects/**`, method: 'GET' }).as(
      'batch-prospects'
    );
    cy.get(smsTemplateDropDown)
      .find('option')
      .each($option => {
        cy.get(smsTemplateDropDown).select($option[0].value);
        cy.wait('@batch-prospects');
        cy.getState().then(state => {
          const { message: templateMsg } = state.smsTemplates.templates[$option[0].value];
          cy.get('[data-test=sms-template-preview]').contains(templateMsg);
          const { smsMsgText: smsMsg } = state.campaignsBatchProspectsStore.campaignsBatchProspects[0];
          cy.get('[data-test=batch-prospect-message]').contains(smsMsg);
        });
      });
  });

  it('displays a loading spinner while new message template is loading', () => {
    cy.server();
    cy.stubResponse({
      url: `campaigns/${campaignId}/batch_prospects/**`,
      response: 'batchTemplates1',
      delay: 500
    }).then(res => {
      cy.get(smsTemplateDropDown)
        .find('option')
        .each($option => {
          cy.get(smsTemplateDropDown).select($option[0].value);
          cy.get('[data-test=spinner]').should('exist');
          cy.get('[data-test=batch-prospect-message]').should('not.exist');
          cy.wait(`@${res.alias}`);
          cy.get('[data-test=spinner]').should('not.exist');
          cy.get('[data-test=batch-prospect-message]').should('exist');
        });
    });
  });

  it('changes the batch messages to next batch message after clicking send button', () => {
    cy.server();
    cy.route({ method: 'POST', url: `**/batch_send/**` }).as('batch-send');
    cy.get('[data-test=batch-send-button]').click({ force: true });
    cy.wait('@batch-send').then(({ xhr }) => {
      expect(xhr.status).to.be.equal(200);
      cy.getState().then(state => {
        const { smsMsgText: smsMsg } = state.campaignsBatchProspectsStore.campaignsBatchProspects[1];
        cy.get('[data-test=batch-prospect-message]').contains(smsMsg);
      });
    });
  });
});
