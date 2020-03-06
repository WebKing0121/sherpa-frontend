describe('desktop campaigns unread messages tab', () => {
    const url = Cypress.env('clientUrl'),
          unreadMessagesTab = '[data-test=unread-messages-tab]',
          listItem = '[data-test=list-item]',
          messages = '[data-test=messages-tab]',
          prospectCard = '[data-test=prospect-card]'

    before(() => {
        cy.login();
    });

    beforeEach(() => {
        cy.viewport(1280, 720);
    })

    it('displays the correct prospect detail in the messages pane', () => {
        cy.visit(`${url}/campaigns`);
        cy.get('[data-test="All Unread"]').click({ force: true });
        cy.get(unreadMessagesTab).find(`${listItem}`).each(($item, idx) => {
            cy.wrap($item).find('div .stretched-link').click({ force: true });
            cy.wrap($item).find('[data-test=list-item-header] h5 span').then($header => {
                cy.get(`${prospectCard} h2`).contains($header[0].textContent)
            })
        })
    });

    it('displays the correct messages when first visiting the tab', () => {
        cy.reload();
        cy.login();
        cy.visit(`${url}/campaigns`);
        cy.get('[data-test="All Unread"]').click({ force: true });
        cy.getState().then(({ campaignProspectStore, prospectDetailsReducer }) => {
            const { campaignProspectsUnread: unreadMesagesStore } = campaignProspectStore,
                  firstProspect = unreadMesagesStore[1][0],
                  { prospectMessages: { list: messagesList } } = prospectDetailsReducer,
                  firstProspectMessages = messagesList[firstProspect.id],
                  messagesArray = Object.values(firstProspectMessages).reverse();
           
            cy.get(messages).find('li').each(($message, idx) => {
                cy.wrap($message).find('div div').contains(messagesArray[idx].message)
            })
        })
    });

    /*
     * NOTE: There MUST be at least 2 prospects with unread messages in this campaign for this test to pass
     * The second prospect CANNOT be the test prospect or else the tests for the prospect details messages tab will fail
     */

    it('removes the prospect from the list when their messages is marked as read', () => {
        cy.get(unreadMessagesTab).find(`${listItem}`).then($item => {
            cy.wrap($item[1]).click();
            cy.get(messages).find('li').each(($message, idx) => {
                if ($message.hasClass('unread')) {
                    cy.wrap($message).click({ force: true });
                }
            });
            cy.wrap($item[1]).should('not.exist');
        });
    });
});
