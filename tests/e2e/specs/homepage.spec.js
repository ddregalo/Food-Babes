describe("Homepage", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("Home");
    cy.contains("About");
    cy.contains("Recipes");
  });
});
