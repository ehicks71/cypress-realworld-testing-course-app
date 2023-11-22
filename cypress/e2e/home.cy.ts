// @ts-ignore
import aCourses from '../fixtures/courses.json';

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  context('Hero section', () => {
    it('the h1 contains the correct text', () => {
      cy.getByData('hero-heading')
        .contains('Testing Next.js Applications with Cypress');
    });

    it('the features on the homepage are correct', () => {
      cy.get('dt').eq(0).contains('4 Courses');
      cy.get('dt').eq(1).contains('25+ Lessons');
      cy.get('dt').eq(2).contains('Free and Open Source');
    });
  });

  context('Course section', () => {
    aCourses.forEach((oCourse: {title: string, slug: string, lessons: {}[] }, iCourseIndex: number) => {
      it(`Course: "${oCourse.title}"`, () => {
        cy.getByData(`course-${iCourseIndex}`)
            .find('a')
            .contains('Get started')
            .click();
        cy.location('pathname')
            .should('equal', `/${oCourse.slug}`);
      });
    });
  });
});
