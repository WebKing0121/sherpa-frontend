describe('Navbar', () => {
  // log in and wait for login process to complete
  before(() => {
    cy.login();

    cy.waitForCall();
  });

  // expand navbar for each test
  beforeEach(() => {
    cy.get('[data-test=navbar-arrow]').click();
  });

  it('should expand navbar', () => {
    cy.get('[data-test=navbar-collapse').should('be.visible');
  });

  it('should have 3 routes', () => {
    cy.get('[data-test=routes] > li').should('have.length', 3);
  });

  it('should click campaign link and change to campaign route', () => {
    cy.get('[data-test=routes] > li')
      .contains('Campaigns')
      .click();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });

  it('should click prospects link and change to prospects route', () => {
    cy.get('[data-test=routes] > li')
      .contains('Prospects')
      .click();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/prospects');
    });
  });

  it('should click support link and change to support route', () => {
    cy.get('[data-test=routes] > li')
      .contains('Support')
      .click();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/support');
    });
  });

  it('should find navbar brand element', () => {
    cy.get('[data-test=navbar-brand').should('exist');
  });

  it('should click navbar brand logo to load root route', () => {
    cy.get('[data-test=routes] > li')
      .contains('Support')
      .click();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/support');
    });

    cy.get('[data-test=navbar-brand').click();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });

  it('should expand and collapse navbar', () => {
    cy.get('[data-test=navbar-arrow]').click();
    cy.get('[data-test=navbar-collapse').should('be.visible');
    cy.get('[data-test=navbar-arrow]').click();
    cy.get('[data-test=navbar-collapse').should('not.be.visible');
  });

  it('should log user out', () => {
    cy.get('[data-test=logout-link]').click();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/login');
    });
  });
});
