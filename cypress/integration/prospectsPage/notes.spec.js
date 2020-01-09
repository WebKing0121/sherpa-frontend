describe('Prospect search, details page, and notes', () => {
  const addNoteBtn = '[data-test=add-note-btn]',
    noteFormBtn = '[data-test=note-form-btn]',
    noteDetails = '[data-test=note-details]',
    dateMinLength = 19,
    url = Cypress.env('clientUrl'),
    toasts = '[data-test=toast]',
    prospectUrl = 'prospect/4/details',
    testNoteText = 'testing 123';

  let notesLength = 0;

  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.get('body').then($body => {
      if ($body.find(toasts).length > 0) {
        cy.get(`${toasts} button`).each($btn => cy.wrap($btn).click());
      }
    });
  });

  it('renders the notes tab', () => {
    cy.server();
    cy.route({ method: 'GET', url: '**/prospects/**' }).as('prospect');
    cy.visit(`${url}/${prospectUrl}`);
    cy.wait('@prospect').then(() => {
      cy.get('[data-test=Notes]').contains('Notes');
    });
  });

  it('selects and renders the notes pane', () => {
    cy.get('.nav-link')
      .last()
      .click();
    cy.get('h3').contains('Notes');
  });

  it('renders "add note" button', () => {
    cy.get(addNoteBtn).contains('Add Note');
  });
  // checks add note modal and adds note
  it('opens modal when clicking "add note" button', () => {
    cy.get(addNoteBtn).click();
    cy.get('.modal').should('be.visible');
  });

  it('displays correct modal header', () => {
    cy.get('.modal-header').contains('Add a Note');
  });

  it('renders the textarea field', () => {
    cy.get('.modal-body textarea').should('exist');
  });

  it('accepts text input', () => {
    cy.get('.modal-body textarea')
      .type(testNoteText)
      .should('have.value', testNoteText);
  });

  it('renders the "submit note" button', () => {
    cy.get(noteFormBtn).contains('Submit Note');
  });

  it('closes modal after submitting a new note', () => {
    cy.server();
    cy.route({ method: 'POST', url: '**/prospect-notes' }).as('addNote');
    cy.get(noteFormBtn).click();
    cy.wait('@addNote');
    cy.get('.modal').should('not.exist');
  });

  //check new note
  it('renders the new note and success toast', () => {
    cy.get(`${noteDetails} p`)
      .first()
      .contains(testNoteText);
    cy.get(toasts)
      .last()
      .should('have.class', 'alert-success');
  });

  it('sets the length of notesList', () => {
    cy.server();
    //set note length for later use
    cy.get(noteDetails)
      .its('length')
      .then(len => {
        notesLength = len;
        cy.get(noteDetails).should('have.length', notesLength);
      });
  });

  it('contains 4 children', () => {
    cy.get(`${noteDetails}`)
      .first()
      .children()
      .should('have.length', 4);
  });

  it('contains all relevant note details', () => {
    cy.get(`${noteDetails} pre`)
      .first()
      .invoke('text')
      .its('length')
      .should('be.gte', dateMinLength);
    cy.get(`${noteDetails} h4`)
      .first()
      .contains('George Washington');
    cy.get(`${noteDetails} p`)
      .first()
      .contains(testNoteText);
    cy.get(`${noteDetails} div`)
      .first()
      .find('button')
      .first()
      .contains('Edit');
    cy.get(`${noteDetails} div`)
      .first()
      .find('button')
      .last()
      .contains('Delete');
  });

  it('fails on submitting a new note, closes add note modal, displays failure toast, and does not add new note to display', () => {
    cy.server();
    cy.route({ method: 'POST', url: '**/prospect-notes', status: 500, response: {} }).as('addNote');
    cy.get(addNoteBtn).click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal-body textarea')
      .type('failure note')
      .should('have.value', 'failure note');
    cy.get(noteFormBtn).click();
    cy.wait('@addNote');
    cy.get(toasts)
      .last()
      .should('have.class', 'alert-danger');
    cy.get(noteDetails).should('have.length', notesLength);
  });

  //edit note
  it('opens modal when clicking "edit note" button', () => {
    cy.get(`${noteDetails} div`)
      .first()
      .find('button')
      .first()
      .click();
    cy.get('.modal').should('be.visible');
  });

  it('displays correct modal header', () => {
    cy.get('.modal-header').contains('Edit Note');
  });

  it('renders the textarea field', () => {
    cy.get('.modal-body textarea').should('exist');
  });

  it('contains the original note text', () => {
    cy.get('.modal-body textarea').should('have.value', testNoteText);
  });

  it('modifies the note text', () => {
    cy.get('.modal-body textarea')
      .type('4567')
      .should('have.value', `${testNoteText}4567`);
  });

  it('renders the "update note" button', () => {
    cy.get(noteFormBtn).contains('Update Note');
  });

  it('closes modal after submitting changes note', () => {
    cy.server();
    cy.route({ method: 'PATCH', url: '**/prospect-notes/**' }).as('editNote');
    cy.get(noteFormBtn).click();
    cy.get('.modal').should('not.exist');
    cy.wait('@editNote');
  });

  it('displays updated note text and a success toast', () => {
    cy.get(toasts)
      .last()
      .should('have.class', 'alert-success');
    cy.get(`${noteDetails} p`)
      .first()
      .contains(`${testNoteText}4567`);
  });

  it('fails on editing a note, closes edit note modal, updates the note with the new text, reverts the text to the old note text, and displays a failure toast', () => {
    cy.server();
    cy.route({
      method: 'PATCH',
      url: '**/prospect-notes/**',
      status: 500,
      response: {},
      delay: 1500
    }).as('editNote');
    cy.get(`${noteDetails} div`)
      .first()
      .find('button')
      .first()
      .click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal-body textarea')
      .type(' edit note failure')
      .should('have.value', `${testNoteText}4567 edit note failure`);
    cy.get(noteFormBtn).click();
    cy.get('.modal').should('not.be.visible');
    cy.get(`${noteDetails} p`)
      .first()
      .contains(`${testNoteText}4567 edit note failure`);
    cy.wait('@editNote');
    cy.get(`${noteDetails} p`)
      .first()
      .contains(testNoteText);
    cy.get(toasts)
      .last()
      .should('have.class', 'alert-danger');
  });

  it('fails the delete note networks request, deletes the note from the display, adds back to the display after the network request finishes and displays and error toast', () => {
    cy.server();
    cy.route({
      method: 'DELETE',
      url: '**/prospect-notes/**',
      delay: 1500,
      status: 500,
      response: {}
    }).as('deleteNote');
    cy.get(`${noteDetails} div`)
      .first()
      .find('button')
      .last()
      .contains('Delete')
      .click();
    cy.get(noteDetails).should('have.length', notesLength - 1);
    cy.wait('@deleteNote');
    cy.get(noteDetails).should('have.length', notesLength);
    cy.get(toasts)
      .last()
      .should('have.class', 'alert-danger');
  });

  // delete note
  it('deletes note', () => {
    cy.server();
    cy.route({ method: 'DELETE', url: '**/prospect-notes/**' }).as('deleteNote');
    cy.get(`${noteDetails} div`)
      .first()
      .find('button')
      .last()
      .contains('Delete')
      .click();
    cy.wait('@deleteNote');
    cy.get(toasts)
      .last()
      .should('have.class', 'alert-success');
    //check that number of notes matches number before test note was added
    cy.get(noteDetails).should('have.length', notesLength - 1);
  });
});
