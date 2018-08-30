import RecipeApi from '@/services/RecipeApi'

export default {
    getRecipes () {
      return RecipeApi().get('recipes')
    }
  }
