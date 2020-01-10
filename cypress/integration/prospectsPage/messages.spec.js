import { generateRandomString } from '../../helpers/functions';

describe('Prospect details', () => {
  const messagesTab = '[data-test=messages-tab]',
    displayedData = '[data-test=displayed-data]',
    messages = `${messagesTab} ${displayedData} ul`,
    url = Cypress.env('clientUrl'),
    prospectNum = Cypress.env('testProspect'),
    prospectUrl = `${url}/prospect/${prospectNum}/details`,
    emptyMessagesText = 'Send a message to start a conversation with this prospect',
    messageUpdateTimer = Cypress.env('pollingTimer'),
    testMessage = generateRandomString(),
    messageColors = Cypress.env('cssColors');

  let messagesLength = 0;

  before(() => {
    cy.login();
  });

  it('renders the messages tab', () => {
    cy.server();
    cy.route({ method: 'GET', url: `**/prospects/**` }).as('prospect');
    cy.route({ method: 'GET', url: `**/prospects/${prospectNum}/messages`, response: {} }).as(
      'messages'
    );
    cy.visit(`${prospectUrl}`);
    cy.wait('@prospect').then(() => {
      cy.get('[data-test=Messages]').contains('Messages');
    });
    cy.wait('@messages');
  });

  it('selects and renders the messages pane', () => {
    cy.get('[data-test=Messages]').click();
    cy.get('[data-test=Messages').should('have.class', 'active');
  });

  it('displays an empty messages text when there are no messages', () => {
    cy.get(messages).then($msgs => {
      cy.wrap($msgs)
        .find('li')
        .should('not.exist');
      cy.wrap($msgs)
        .find('div')
        .contains(emptyMessagesText);
    });
  });

  it('displays messages', () => {
    cy.reload();
    cy.login();
    cy.route({ method: 'GET', url: '**/prospects/**' }).as('prospect');
    cy.route({ method: 'GET', url: `**/prospects/${prospectNum}/messages` }).as('messages');
    cy.visit(`${prospectUrl}`);
    cy.wait('@prospect');
    cy.wait('@messages');
    cy.get(messages).then($msgs => {
      cy.wrap($msgs)
        .find('li')
        .should('exist');
    });
  });

  it('sets the number of messages and displays the correct amount', () => {
    cy.get(`${messages} li`).then($msgs => {
      cy.wrap($msgs)
        .its('length')
        .then(len => {
          messagesLength = len;
          cy.wrap($msgs).should('have.length', messagesLength);
        });
    });
  });

  it('displays the correct background color for each message', () => {
    cy.get('[data-test=user-message]').each($msg => {
      cy.wrap($msg)
        .find('div')
        .should('have.css', 'background-color')
        .and('eq', messageColors.sherpaBlue);
    });
    cy.get('[data-test=prospect-message]').each($msg => {
      cy.wrap($msg)
        .find('div')
        .should('have.css', 'background-color')
        .and('eq', messageColors.sherpaWhite);
    });
  });

  it('displays the correct elements for each message', () => {
    cy.get(`${messages} li`).each($msg => {
      cy.wrap($msg)
        .find('div')
        .should('exist');
      cy.wrap($msg)
        .find('time')
        .should('exist');
    });
  });

  it('displays the new message input field', () => {
    cy.get(messagesTab)
      .find('form')
      .within($form => {
        cy.wrap($form).should('exist');
        cy.wrap($form).should('exist');
        cy.wrap($form)
          .find('input')
          .should('exist');
        cy.wrap($form)
          .find('button[type=submit]')
          .should('exist');
        cy.wrap($form)
          .find('button[type=button]')
          .should('exist');
      });
  });

  it('is disabled while there is no text', () => {
    cy.get(messagesTab)
      .find('form')
      .within($form => {
        cy.wrap($form)
          .find('input')
          .should('have.attr', 'value', '');
        cy.wrap($form)
          .find('button[type=submit]')
          .should('be.disabled');
      });
  });

  it('accepts inputs in the text field', () => {
    cy.get(messagesTab)
      .find('form')
      .within($form => {
        cy.wrap($form)
          .find('input')
          .type(testMessage)
          .should('have.attr', 'value', testMessage);
      });
  });

  it('adds the new message on submit', () => {
    cy.server();
    cy.route({ method: 'POST', url: `**/prospects/${prospectNum}/send_message/` }).as('sendMessage');
    cy.route({ method: 'GET', url: `**/prospects/${prospectNum}/messages/` }).as('getMessages');
    cy.get(messagesTab)
      .find('form')
      .within($form => {
        cy.wrap($form)
          .find('input')
          .clear()
          .type(testMessage);
        cy.wrap($form)
          .find('button[type=submit]')
          .click();
      });
    cy.wait('@sendMessage');
    cy.wait('@getMessages');
    cy.get(`${messages} li`).should('have.length', messagesLength + 1);
  });

  it('displays the new message', () => {
    cy.get(`${messages} li`)
      .first()
      .then($msg => {
        cy.wrap($msg)
          .find('div')
          .contains(testMessage);
        cy.wrap($msg).should('have.attr', 'data-test', 'user-message');
      });
  });

  it('display a failure toast on message send fail', () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: `**/prospects/${prospectNum}/send_message`,
      status: 500,
      response: {}
    }).as('sendMessage');
    cy.get(messagesTab)
      .find('form')
      .within($form => {
        cy.wrap($form)
          .find('input')
          .clear()
          .type('failure message');
        cy.wrap($form)
          .find('button[type=submit]')
          .click();
      });
    cy.wait('@sendMessage');
    cy.checkForNewToast('alert-danger');
  });

  it(`updates messages periodically every ${messageUpdateTimer} seconds`, () => {
    let startTime;
    let stopTime;
    const timer = (messageUpdateTimer + 5) * 1000;
    const options = { requestTimeout: timer, responseTimeout: timer };
    // has to reload page to reset polling timer
    cy.reload();
    cy.login();
    cy.server();
    cy.route({ method: 'GET', url: `**/prospects/${prospectNum}/**` }).as('prospect');
    cy.visit(`${prospectUrl}`);
    cy.wait('@prospect', options).then(() => {
      startTime = Date.now();
    });
    cy.route({
      method: 'GET',
      url: `**/prospects/${prospectNum}/messages`,
      response: {}
    }).as('pollingCheck');
    cy.wait('@pollingCheck', options).then(req => {
      stopTime = Date.now();
      const totalTime = ((stopTime - startTime) / 1000).toFixed();
      assert.isNotNull(req.response.body, `full api request has completed`);
      assert.equal(
        totalTime,
        messageUpdateTimer,
        `${totalTime} seconds is equal to ${messageUpdateTimer} seconds`
      );
    });
  });
});