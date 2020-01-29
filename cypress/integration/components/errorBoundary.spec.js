describe('Error boundary tests', () => {
    const errorBoundary = '[data-test=error-boundary]'
    const url = Cypress.env('clientUrl');

    before(() => {
	cy.login();
    })

    it('displays the error component when is error', () => {
	cy.visit(`${url}/support`);
	cy.getState().then(state => {
	    console.log(state)
	})
	const badData = [{
	    id: 1,
	    icon: null,
	    title: {},
	    description: {},
	    url: '#'
	}]
	cy.dispatchAction({ type: 'SET_SUPPORT_ITEMS', results: badData } );
	Cypress.on('uncaught:exception', () => false)
	cy.get(errorBoundary).should('exist');
    });
});
