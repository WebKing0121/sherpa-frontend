describe('Login form', () => {
  const emailInput = 'input[name="username"]',
    passwordInput = 'input[name="password"]',
    emailValue = 'george@asdf.com',
    passwordValue = 'testu123',
    url = Cypress.env('clientUrl');

  before(() => {
    cy.visit(`${url}/login`);
    cy.server();
  });

  beforeEach(() => {
    cy.visit(`${url}/login`);
  });

  it('has both login fields', () => {
    cy.get('input').should('have.length', 2);
  });

  it('has "required" attribute for both fields', () => {
    cy.get(emailInput).should('have.attr', 'required');

    cy.get(passwordInput).should('have.attr', 'required');
  });

  it('should have a disabled submit button when fields are empty', () => {
    cy.get(emailInput).should('have.value', '');

    cy.get(passwordInput).should('have.value', '');
    cy.get('button').should('be.disabled');
  });

  it('accepts inputs', () => {
    cy.get(emailInput)
      .type(emailValue)
      .should('have.value', emailValue);

    cy.get(passwordInput)
      .type(passwordValue)
      .should('have.value', passwordValue);
  });

  it('should not have a disabled submit button when fields are not empty', () => {
    cy.get(emailInput)
      .type(emailValue)
      .should('have.value', emailValue);

    cy.get(passwordInput)
      .type(passwordValue)
      .should('have.value', passwordValue);

    cy.get('button').should('not.be.disabled');
  });

  it('fails login verification and displays an error message', () => {
    cy.get(emailInput).type(emailValue);

    cy.get(passwordInput).type('incorrectPassword');
    cy.server();
    cy.stubResponse({ method: 'POST', url: 'auth/jwt/create', response: 'loginFailure', status: 401 });

    cy.get('button').click();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/login');
    });

    cy.get('[data-test=login-form-error]').should('not.be.empty');
  });

  it('successfully logs in', () => {
    cy.server();
    cy.stubResponse({ method: 'POST', url: 'auth/jwt/create', response: 'tokens' });
    cy.stubResponse({ url: 'auth/users/me', response: 'userInfo' });
    cy.stubResponse({ url: 'markets', response: 'markets' });
    cy.stubResponse({ url: 'leadstages', response: 'leadStages' });

    cy.get(emailInput).type(emailValue);
    cy.get(passwordInput).type(passwordValue);
    cy.get('button').click();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });
});
