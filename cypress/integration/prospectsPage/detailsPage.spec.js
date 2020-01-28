describe('Prospect details page', () => {
  const url = Cypress.env('clientUrl'),
    prospectId = Cypress.env('testProspect'),
    prospectUrl = `prospect/${prospectId}/details`;

  before(() => {
    cy.login();
  });

  it('opens the correct page', () => {
    cy.server();
    cy.stubResponse({
      method: 'GET',
      url: `prospects/${prospectId}/**`,
      response: `prospect${prospectId}`
    });
    cy.visit(`${url}/${prospectUrl}`);
    cy.location().should(location => {
      expect(location.pathname).to.eq(`/${prospectUrl}`);
    });
  });

  it('displays the correct tabs', () => {
    cy.get('[data-test=Details]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-test=Messages]')
      .should('exist')
      .and('be.visible');
    cy.get('[data-test=Notes]')
      .should('exist')
      .and('be.visible');
  });

  it('takes the user back to the prospects page when clicking the "prospect List" button', () => {
    cy.login();
    cy.server();
    cy.stubResponse({
      method: 'GET',
      url: `prospects/${prospectId}/**`,
      response: `prospect${prospectId}`
    });
    cy.visit(`${url}/prospects`);
    cy.visit(`${url}/${prospectUrl}`);
    cy.get(`[data-test=tabbed-header]`)
      .find('button')
      .click();
    cy.location().should(location => {
      expect(location.pathname).to.eq(`/prospects`);
    });
  });
});
