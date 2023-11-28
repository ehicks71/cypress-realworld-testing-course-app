import Subscribe from "./Subscribe";

describe('Subscribe', () => {
  it('should render', () => {
    cy.mount(<Subscribe />);
  })
  context('initial state', () => {
    beforeEach(() => {
      cy.mount(<Subscribe />);
    });
    it('should contain the correct placeholder text', () => {
      cy.get('input').should('have.attr', 'placeholder', 'Subscribe for Updates');
    });
    it('should have an empty email input', () => {
      cy.getByData('email-input').should('have.value', '');
    });
  });
  context('form submission', () => {
    beforeEach(() => {
      cy.mount(<Subscribe />);
    });
    it('allows users to subscribe to the email list', () => {
      cy.intercept('POST', '/api/subscribe', {
        body: {
          message: "Success: tom@example.com has been successfully subscribed",
        },
      }).as('emailSubscribe');

      cy.getByData('email-input').type('tom@example.com');
      cy.getByData('submit-button').click();

      cy.wait('@emailSubscribe');

      cy.getByData('success-message')
        .should('exist')
        .contains('tom@example.com');
    });
    it('does NOT allow already subscribed email addresses', () => {
      cy.intercept('POST', '/api/subscribe', {
        body: {
          message: "Error: john@example.com already exists. Please use a different email address.",
        },
      }).as('emailSubscribe');

      cy.getByData('email-input').type('john@example.com');
      cy.getByData('submit-button').click();

      cy.wait('@emailSubscribe');

      cy.getByData('server-error-message')
        .should('exist')
        .contains('Error: john@example.com already exists. Please use a different email address.');
    });
  });
});
