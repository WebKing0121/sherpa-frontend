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

  cy.get('input')
    .first()
    .type('george@asdf.com');

  cy.get('input')
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

Cypress.Commands.add('createFixture', (fileName, route = '', method = 'GET', qs = {}, body = {}) => {
  const url = Cypress.env('serverUrl');
  cy.fixture('tokens').then(json => {
    const options = {
      method,
      url: `${url}/${route}/`,
      auth: {
        bearer: json.access
      },
      qs, //additional query parameters
      body
    };
    cy.request(options).then(res => {
      cy.writeFile(`cypress/fixtures/${fileName}`, res.body);
    });
  });
});
