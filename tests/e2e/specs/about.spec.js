describe("About Page", () => {
    
  beforeEach(() => {
      cy.visit('/');
      cy.get('[href="/about"]').click();
    });
    
  it("Has title", () => {
    cy.contains("This is an about page");
  });
});