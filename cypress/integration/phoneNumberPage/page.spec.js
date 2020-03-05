describe('Phone Number Page', () => {
  const clientUrl = Cypress.env('clientUrl');

  it('initial load of phone numbers and dont reload numbers again', () => {
    cy.viewport(950, 800);
    cy.login();
    cy.server();
    cy.route({ url: '**/phone-numbers/**' }).as('numbers');
    cy.visit(`${clientUrl}/phone-manager`);

    cy
      .get('[data-test=spinner]')
      .should('exist');

    cy.wait('@numbers');

    cy
      .getState()
      .then(store => {
        const { numberManagerStore: { numbers } } = store;

        expect(Object.keys(numbers)).to.have.length.of.at.least(1);

        cy.visit(`${clientUrl}/campaigns`);
        cy.wait(2000);
        cy.visit(`${clientUrl}/phone-manager`);
        cy
          .get('[data-test=spinner]')
          .should('not.exist');
      });
  });

});
