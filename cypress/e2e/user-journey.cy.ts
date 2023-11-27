// @ts-ignore

import aCourses from '../fixtures/courses.json';

describe('User Journey', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  context('Completing courses found on the homepage', () => {
    // Iterate over each course.
    aCourses.forEach((oCourse: {title: string, slug: string, lessons: {}[] }, iCourseIndex: number) => {
      it(`user can find course "${oCourse.title}" on the home page and complete the course lessons`, () => {

        // Click on the course link based on the lesson index
        cy.getByData(`course-${iCourseIndex}`)
          .find('a')
          .contains('Get started')
          .click();
        cy.location('pathname').should('equal', `/${oCourse.slug}`);
        cy.getByData('next-lesson-button')
          .contains('Start Course')
          .click();
        const aCourseLessons= oCourse.lessons;

        // Iterate over each lesson in the course.
        aCourseLessons.forEach((oLesson: {slug: string}, iLessonIndex: number) => {
          const sLessonPath = `/${oCourse.slug}/${oLesson.slug}`;
          cy.location('pathname').should('eq', sLessonPath);
          cy.getByData('challenge-answer-0').click();

          // If it's not the last lesson, click on "Next Lesson" button
          if (iLessonIndex < aCourseLessons.length - 1) {
            cy.getByData('next-lesson-button')
              .should('exist')
              .contains('Next Lesson')
              .click();
          }
        });

        // When all lessons finished, click on "Complete Course" button
        cy.getByData('next-lesson-button')
          .should('exist')
          .contains('Complete Course')
          .click();
        cy.location('pathname').should('eq', '/');
      });
    });

  });
});
