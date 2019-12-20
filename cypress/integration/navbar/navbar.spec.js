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

  it('expands navbar', () => {
    cy.get('[data-test=navbar-collapse').should('be.visible');
  });

  it('has 3 routes', () => {
    cy.get('[data-test=routes] > li').should('have.length', 3);
  });

  it('changes to campaign route when campaign link is clicked', () => {
    cy.get('[data-test=routes] > li')
      .contains('Campaigns')
      .click();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/');
    });
  });

  it('changes to prospects route when prospects link is clicked', () => {
    cy.get('[data-test=routes] > li')
      .contains('Prospects')
      .click();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/prospects');
    });
  });

  it('changes to support route when support link is clicked', () => {
    cy.get('[data-test=routes] > li')
      .contains('Support')
      .click();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/support');
    });
  });

  it('renders navbar brand element', () => {
    cy.get('[data-test=navbar-brand').should('exist');
  });

  it('loads root route when navbar brand logo is clicked', () => {
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

  it('expands and collapses navbar', () => {
    cy.get('[data-test=navbar-arrow]').click();
    cy.get('[data-test=navbar-collapse').should('be.visible');
    cy.get('[data-test=navbar-arrow]').click();
    cy.get('[data-test=navbar-collapse').should('not.be.visible');
  });

  it('logs user out', () => {
    cy.get('[data-test=logout-link]').click();

    cy.location().should(location => {
      expect(location.pathname).to.eq('/login');
    });
  });
});
