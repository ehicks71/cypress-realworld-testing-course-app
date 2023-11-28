import Subscribe from "./Subscribe";

describe('Subscribe', () => {
  it('should render', () => {
    cy.mount(<Subscribe />);
  });
  it('contains the correct placeholder text', () => {
      cy.mount(<Subscribe />);
      cy.get('input').should('have.attr', 'placeholder', 'Subscribe for Updates');
  });
  it.only('allows users to subscribe to the email list', () => {
     cy.mount(<Subscribe />);

     cy.intercept('POST', '/api/subscribe', {
       body: {
         message: "Success: tom@example.com has been successfully subscribed",
       },
     }).as("emailSubscribe");

     cy.get("[data-test='email-input']").type("tom@example.com");
     cy.get("[data-test='submit-button']").click();

     cy.wait("@emailSubscribe");

     cy.get("[data-test='success-message']")
       .should('exist')
       .contains('tom@example.com');
  });
});
