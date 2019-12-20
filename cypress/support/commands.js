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

// Cypress.Commands.add('login', () => {
//   cy.request({
//     method: 'POST',
//     url: 'http://localhost:8000/api/v1/auth/jwt/create/',
//     body: {
//       username: 'george@asdf.com',
//       password: 'testu123'
//     }
//   }).then(({ body }) => {
//     cy.window()
//       .its('store')
//       .then(store => {
//         store.dispatch({ type: 'SET_AUTH_STATE', ...body });
//         console.log('body', body);
//         cy.setCookie('access', body.access);
//       });
//   });
// });

Cypress.Commands.add('login', () => {
  cy.visit('login');

  cy.get('input')
    .first()
    .type('george@asdf.com');

  cy.get('input')
    .last()
    .type('testu123');

  cy.get('[data-test=login-form]').submit();
});

Cypress.Commands.add('apiCall', (method, route) => {
  cy.server();
  cy.route(method, `/api/v1/${route}/`).as('route');
  cy.wait('@route');
});

Cypress.Commands.add('waitForCall', () => {
  cy.wait(1500);
});

const defaultDataEl = '[data-test=displayed-data]';

Cypress.Commands.add('testApiData', (element = defaultDataEl, timeout = 0) => {
  cy.waitForCall();
  cy.get(element, { timeout }).should('exist');
});
