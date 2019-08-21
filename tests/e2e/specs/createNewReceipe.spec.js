describe("New Recipe", () => {
	it("user can navigate to the new recipe page", () => {
		navigateToNewRecipePage();
		cy.contains('Add A New Recipe');
	});

	it("user can create a new recipe", () => {
		navigateToNewRecipePage();
		fillOutNewRecipeForm();
		cleanUp();
	});

	function navigateToNewRecipePage() {
		cy.visit("/");
		cy.get('[href="/recipes"]').click();
		cy.get('.link-text').click();
	}

	function fillOutNewRecipeForm() {
		cy.get('#url')
			.type("https://www.bbc.co.uk/food/recipes/spicy_sichuan_noodles_79051");
		cy.get('#imageUrl')
			.type("https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/spicy_sichuan_noodles_79051_16x9.jpg");
		cy.get('#title')
			.type('Sichuan Dan Dan Noodles');
		cy.get('#description')
			.type('Spicy, savoury and fast!');
		cy.get('#meal')
			.select('Lunch');
		cy.get('#cuisine')
			.select('Chinese');
		cy.get('#totalTime')
			.type('40');
		cy.get('#prepTime')
			.type('20');
		cy.get('#cookTime')
			.type('20');
		fillOutIngredients();
		cy.get('#method').type('Cook the reciipe');
		cy.get(':nth-child(15) > .btn').click();
	}

	function fillOutIngredients() {
		cy.get('.container-center > .btn').click();
		cy.get('.ingredient').type('Noodles');
		cy.get('.ingredient-quantity').type('2');
		cy.get('.container-center > .btn').click();
		cy.get('.ingredient').eq(1).type('Sesame oil');
		cy.get('.ingredient-quantity').eq(1).type('1');
	}

	function confirmRecipeIsCreated() {
		cy.location('/recipes');
		cy.contain('Sichuan Dan Dan Noodles');
	}

	function cleanUp() {
		cy.get(':nth-child(1) > .card > .card-body > [href="#"]').click();
	}
});
  