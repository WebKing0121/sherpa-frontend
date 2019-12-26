describe('Create fixture files from API response', () => {
  it('creates auth token JSON file', () => {
    cy.createTokensJson();
    cy.fixture('tokens').should('exist');
  });

  it('creates login failure JSON file', () => {
    const loginError = Cypress.env('loginError');
    cy.writeFile('cypress/fixtures/loginFailure.json', { loginError }).then(({ loginError }) => {
      expect(loginError).to.equal(loginError);
    });
  });
  it('creates the support page response JSON file', () => {
    cy.createFixture('support.json', 'support-links');
    cy.fixture('support').should('exist');
  });
  it('creates a prospect list response JSON file', () => {
    cy.createFixture('prospects.json', 'prospects');
    cy.fixture('prospects').should('exist');
  });
  it('creates a prospect 1 response JSON file', () => {
    cy.createFixture('prospect1.json', 'prospects/1');
    cy.fixture('prospect1').should('exist');
  });
  it('creates a prospect 1 notes response JSON file', () => {
    const params = { expand: 'created_by', prospect: '1', page: 1, page_size: 10 };
    cy.createFixture('prospect1Notes.json', 'prospect-notes', 'GET', params);
    cy.fixture('prospect1Notes').should('exist');
  });
});
