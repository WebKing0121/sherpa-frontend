describe('Prospect search, details page, and notes', () => {
  const searchModuleInput = '[data-test=search-module-input]',
    searchModuleButton = '[data-test=search-module-button]',
    displayedData = '[data-test=displayed-data]',
    spinner = '[data-test=spinner]',
    listItemLink = '[data-test=list-item-link]',
    addNoteBtn = '[data-test=add-note-btn]',
    noteFormBtn = '[data-test=note-form-btn]',
    noteDetails = '[data-test=note-details]',
    search = '303',
    dateMinLength = 19,
    url = Cypress.env('clientUrl');

  let notesLength = 0;

  before(() => {
    cy.login();
    cy.visit(`${url}/prospects`);
  });

  it('has search module input field', () => {
    cy.get(searchModuleInput).should('exist');
  });

  it('accepts inputs', () => {
    cy.get(searchModuleInput)
      .type(search)
      .should('have.value', search);
  });

  it('contains button', () => {
    cy.get(searchModuleButton).should('exist');
  });

  it('performs a prospect search', () => {
    cy.get(searchModuleButton).click();
    cy.server();
    const options = { url: 'prospects', response: 'prospects' };
    cy.stubResponse(options);
    // cy.get(spinner, { timeout: 0 }).should('exist');
  });

  // it('displays prospect search results', () => {
  //   cy.get(displayedData).should('exist');
  // });

  // it('selects the first prospect', () => {
  //   cy.pause();
  //   cy.get(listItemLink)
  //     .first()
  //     .click({ force: true });
  //   cy.waitForCall();
  //   cy.location('pathname')
  //     .should('contain', '/prospect')
  //     .and('contain', 'details');
  // });

  // it('renders the notes tab', () => {
  //   cy.get('.nav-link')
  //     .last()
  //     .contains('Notes');
  // });

  // it('selects and renders the notes pane', () => {
  //   cy.get('.nav-link')
  //     .last()
  //     .click();
  //   cy.get('h3').contains('Notes');
  // });

  // it('renders "add note" button', () => {
  //   cy.get(addNoteBtn).contains('Add Note');
  // });
  // // checks add note modal and adds note
  // it('opens modal when clicking "add note" button', () => {
  //   cy.get(addNoteBtn).click();
  //   cy.get('.modal').should('be.visible');
  // });

  // it('displays correct modal header', () => {
  //   cy.get('.modal-header').contains('Add a Note');
  // });

  // it('renders the textarea field', () => {
  //   cy.get('.modal-body textarea').should('exist');
  // });

  // it('accepts text input', () => {
  //   cy.get('.modal-body textarea')
  //     .type('testing 123')
  //     .should('have.value', 'testing 123');
  // });

  // it('renders the "submit note" button', () => {
  //   cy.get(noteFormBtn).contains('Submit Note');
  // });

  // it('closes modal after submitting a new note', () => {
  //   cy.get(noteFormBtn).click();
  //   cy.get('.modal').should('not.exist');
  // });

  // //check new note
  // it('renders the new note', () => {
  //   cy.waitForCall();
  //   cy.get(`${noteDetails} p`)
  //     .first()
  //     .contains('testing 123');
  // });

  // it('sets the length of notesList', () => {
  //   //set note length for later use
  //   cy.get(noteDetails)
  //     .its('length')
  //     .then(len => {
  //       notesLength = len;
  //     });
  // });

  // it('contains 4 children', () => {
  //   cy.get(`${noteDetails}`)
  //     .first()
  //     .children()
  //     .should('have.length', 4);
  // });

  // it('contains all relevant note details', () => {
  //   cy.get(`${noteDetails} pre`)
  //     .first()
  //     .invoke('text')
  //     .its('length')
  //     .should('be.gte', dateMinLength);
  //   cy.get(`${noteDetails} h4`)
  //     .first()
  //     .contains('George Washington');
  //   cy.get(`${noteDetails} p`)
  //     .first()
  //     .contains('testing 123');
  //   cy.get(`${noteDetails} div`)
  //     .first()
  //     .find('button')
  //     .first()
  //     .contains('Edit');
  //   cy.get(`${noteDetails} div`)
  //     .first()
  //     .find('button')
  //     .last()
  //     .contains('Delete');
  // });

  // //edit note
  // it('opens modal when clicking "edit note" button', () => {
  //   cy.get(`${noteDetails} div`)
  //     .first()
  //     .find('button')
  //     .first()
  //     .click();
  //   cy.get('.modal').should('be.visible');
  // });

  // it('displays correct modal header', () => {
  //   cy.get('.modal-header').contains('Edit Note');
  // });

  // it('renders the textarea field', () => {
  //   cy.get('.modal-body textarea').should('exist');
  // });

  // it('contains the original note text', () => {
  //   cy.get('.modal-body textarea').should('have.value', 'testing 123');
  // });

  // it('modifies the note text', () => {
  //   cy.get('.modal-body textarea')
  //     .type('4567')
  //     .should('have.value', 'testing 1234567');
  // });

  // it('renders the "update note" button', () => {
  //   cy.get(noteFormBtn).contains('Update Note');
  // });

  // it('closes modal after submitting changes note', () => {
  //   cy.get(noteFormBtn).click();
  //   cy.get('.modal').should('not.exist');
  // });

  // it('displays updated note text', () => {
  //   cy.waitForCall();
  //   cy.get(`${noteDetails} p`)
  //     .first()
  //     .contains('testing 1234567');
  // });

  // // delete note
  // it('deletes note', () => {
  //   cy.get(`${noteDetails} div`)
  //     .first()
  //     .find('button')
  //     .last()
  //     .contains('Delete')
  //     .click();
  //   cy.waitForCall();
  //   //check that number of notes matches number before test note was added
  //   cy.get(noteDetails).should('have.length', notesLength - 1);
  // });
});
