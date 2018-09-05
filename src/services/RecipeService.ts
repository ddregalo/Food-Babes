import RecipeApi from "./Recipe.Api";

export default {
  getRecipes() {
    return RecipeApi().get("recipes");
  },

  addRecipe(params: JSON) {
    return RecipeApi().post("recipes", params);
  }
};
