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

    it("has functional recipe search filter", () => {
        cy.get('input').type("lentils");
        cy.contains("Vegan Lentil Moussaka");
        cy.contains("Dinner");
        cy.contains("60 MINS");
    });

});