// https://docs.cypress.io/api/introduction/api.html

describe("Homepage", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("Home");
    cy.contains("About");
    cy.contains("Recipes");
  });
});
