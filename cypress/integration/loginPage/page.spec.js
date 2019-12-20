describe('Login form', () => {
  const form = '[data-test=login-form]',
    emailInput = 'input[name="username"]',
    passwordInput = 'input[name="password"]',
    emailValue = 'george@asdf.com',
    passwordValue = 'testu123';

  beforeEach(() => {
    cy.visit('login');
  });

  it('has both login fields', () => {
    cy.get('input').should('have.length', 2);
  });

  it('has "required" attribute for both fields', () => {
    cy.get(emailInput).should('have.attr', 'required');

    cy.get(passwordInput).should('have.attr', 'required');
  });

  it('accepts inputs', () => {
    cy.get(emailInput)
      .type(emailValue)
      .should('have.value', emailValue);

    cy.get(passwordInput)
      .type(passwordValue)
      .should('have.value', passwordValue);
  });

  it('fails login verification and displays an error message', () => {
    cy.get(emailInput).type(emailValue);

    cy.get(passwordInput).type('incorrectPassword');

    cy.get(form).submit();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/login');
    });

    cy.get('[data-test=login-form-error]').should('not.be.empty');
  });

  it('successfully logs in', () => {
    cy.get(emailInput).type(emailValue);

    cy.get(passwordInput).type(passwordValue);

    cy.get(form).submit();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });
});
