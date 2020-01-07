describe('Create fixture files from API response', () => {
  it('creates auth token JSON file', () => {
    cy.createTokensJson();
    cy.fixture('tokens').should('exist');
  });

  it('creates the login failure JSON file', () => {
    cy.createFixture('loginFailure.json', 'auth/jwt/create', 'POST', {
      body: { username: 'test', password: 'test' },
      failOnStatusCode: false
    });
    cy.fixture('loginFailure').should('exist');
  });

  it('creates the user info JSON file', () => {
    cy.createFixture('userInfo.json', 'auth/users/me');
    cy.fixture('userInfo').should('exist');
  });

  it('creates the markets JSON file', () => {
    cy.createFixture('markets.json', 'markets');
    cy.fixture('markets').should('exist');
  });

  it('creates the campaigns JSON file', () => {
    cy.createFixture('campaigns.json', 'campaigns');
    cy.fixture('campaigns').should('exist');
  });

  it('creates the lead stages JSON file', () => {
    cy.createFixture('leadStages.json', 'leadstages');
    cy.fixture('leadStages').should('exist');
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
    const params = { prospect: '1', page: 1, page_size: 10 };
    cy.createFixture('prospect1Notes.json', 'prospect-notes', 'GET', params);
    cy.fixture('prospect1Notes').should('exist');
  });
});
