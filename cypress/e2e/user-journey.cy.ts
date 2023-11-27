// @ts-ignore


describe('User Journey', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  context('Completing courses found on the homepage', () => {
    // Iterate over each course.
    it(`user can find course "Testing Your First Next.js Application" on the home page and complete the course lessons`, () => {
      // Click on the course link based on the lesson index
      cy.getByData(`course-0`)
        .find('a')
        .contains('Get started').click();
      cy.location('pathname').should('equal', `/testing-your-first-application`);
      cy.getByData('next-lesson-button').contains('Start Course').click();

      let sLessonPath = `/testing-your-first-application/app-install-and-overview`;
      cy.location('pathname').should('eq', sLessonPath);
      cy.getByData('challenge-answer-0').click();
      cy.getByData('next-lesson-button').should('exist').contains('Next Lesson').click();

      sLessonPath = `/testing-your-first-application/installing-cypress-and-writing-our-first-test`;
      cy.location('pathname').should('eq', sLessonPath);
      cy.getByData('challenge-answer-0').click();
      cy.getByData('next-lesson-button').should('exist').contains('Next Lesson').click();

      sLessonPath = `/testing-your-first-application/setting-up-data-before-each-test`;
      cy.location('pathname').should('eq', sLessonPath);
      cy.getByData('challenge-answer-0').click();
      cy.getByData('next-lesson-button').should('exist').contains('Complete Course').click();
      cy.location('pathname').should('eq', '/');
    });
  });
});
