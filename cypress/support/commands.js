// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('manualLogin', () => {
  const url = Cypress.env('clientUrl');
  cy.visit(`${url}/login`);

  cy.get('input[type=email]')
    .first()
    .type('george@asdf.com');

  cy.get('input[type=password')
    .last()
    .type('testu123');

  cy.get('[data-test=login-form]').submit();
});

Cypress.Commands.add('createTokensJson', () => {
  const username = Cypress.env('username'),
    password = Cypress.env('password'),
    url = Cypress.env('serverUrl');
  const options = {
    method: 'POST',
    url: `${url}/auth/jwt/create/`,
    body: {
      username,
      password
    }
  };
  cy.request(options).then(res => {
    cy.writeFile(`cypress/fixtures/tokens.json`, res.body);
  });
});

Cypress.Commands.add('apiCall', (method, route) => {
  cy.server();
  cy.route(method, `**/api/v1/${route}/`).as('call');
  cy.wait('@call');
});

Cypress.Commands.add('waitForCall', () => {
  cy.wait(1500);
});

const defaultDataEl = '[data-test=displayed-data]';

Cypress.Commands.add('testApiData', (element = defaultDataEl, timeout = 0) => {
  cy.waitForCall();
  cy.get(element, { timeout }).should('exist');
});

Cypress.Commands.add('createFixture', (fileName, route = '', method = 'GET', options) => {
  const url = Cypress.env('serverUrl');
  cy.fixture('tokens').then(json => {
    const config = {
      method,
      url: `${url}/${route}/`,
      auth: {
        bearer: json.access
      },
      ...options
    };
    cy.request(config).then(res => {
      cy.writeFile(`cypress/fixtures/${fileName}`, res.body);
    });
  });
});

Cypress.Commands.add('stubResponse', options => {
  const { url, method = 'GET', response, status = 200 } = options;
  cy.fixture(response).as(response);
  cy.route({ method, url: `**/${url}/**`, response: `@${response}`, status });
});

Cypress.Commands.add('login', () => {
  const url = Cypress.env('clientUrl');
  cy.visit(url);
  cy.server();
  cy.stubResponse({ method: 'POST', url: 'auth/jwt/create', response: 'tokens' }).as('loginRes');
  cy.stubResponse({ url: 'auth/users/me', response: 'userInfo' }).as('userInfoRes');
  cy.stubResponse({ url: 'leadstages', response: 'leadStages' }).as('leadStagesRes');
  cy.get('[data-test=login-form]').submit();
  cy.wait('@loginRes');
  cy.wait('@userInfoRes');
  cy.wait('@leadStagesRes');
});

const toasts = '[data-test=toast]';

Cypress.Commands.add('checkForNewToast', cssClass => {
  cy.get(toasts)
    .last()
    .should('have.class', cssClass);
});

Cypress.Commands.add('closeToasts', () => {
  cy.get(toasts).each($toast =>
    cy
      .wrap($toast)
      .find('button')
      .click()
  );
});
