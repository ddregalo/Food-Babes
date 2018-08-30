import RecipeApi from '@/services/RecipeApi'

export default {
    fetchRecipes () {
      return RecipeApi().get('recipes')
    }
  }
