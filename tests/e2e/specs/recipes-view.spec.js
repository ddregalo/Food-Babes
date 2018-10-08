describe("Recipes View", () => {
    
    beforeEach(() => {
        cy.visit("/");
        cy.get('[href="/recipes"]').click();
    });
    
    it("has a title", () => {
        cy.contains("Recipes");
    });

    it("has a new recipe link with text", () => {
        cy.get('.link');
        cy.get('.link-text').contains("NEW RECIPE");
    });

});