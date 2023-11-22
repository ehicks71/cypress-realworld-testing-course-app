// @ts-ignore
describe('Newsletter Subscribe Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('allows users to subscribe to the email list', () => {
      cy.getByData('email-input').type('test@test.com');
      cy.getByData('submit-button').click();
      cy.getByData('success-message')
          .should('exist')
          .contains('test@test.com');
  });

  it.only('does NOT allow an invalid email address', () => {
      cy.getByData('email-input').type('test');
      cy.getByData('submit-button').click();
      cy.getByData('success-message')
          .should('not.exist');
  });

    it('does NOT allow subscribing if already subscribed', () => {
        cy.getByData('email-input').type('john@example.com');
        cy.getByData('submit-button').click();
        cy.getByData('success-message')
            .should('not.exist');
        cy.getByData('server-error-message')
            .should('exist')
            .contains('john@example.com');
        cy.getByData('server-error-message')
            .should('exist')
            .contains('already exists. Please use a different email address.');
    });
});
