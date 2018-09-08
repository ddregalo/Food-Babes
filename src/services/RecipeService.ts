import RecipeApi from "./Recipe.Api";

export default {
  getRecipes() {
    return RecipeApi().get("recipes");
  },

  getRecipe (params: any) {
    return RecipeApi().get('recipes/' + params.id);
  },

  addRecipe(params: JSON) {
    return RecipeApi().post("recipes", params);
  },

  updateRecipe (params: any) {
    return RecipeApi().put('recipes/' + params.id, params);
  },

  deleteRecipe (id: any) {
    return RecipeApi().delete('recipes/' + id)
  }
};