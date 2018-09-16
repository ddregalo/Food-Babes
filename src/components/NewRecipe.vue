<template>
  <div class="new-recipe">
    <h1>Add A New Recipe</h1>
    <div class="container">
      <NewRecipeForm></NewRecipeForm>
    </div>    
  </div>
</template>

<script type="ts">
import Vue from "vue";
import RecipeService from "@/services/RecipeService";
import NewRecipeForm from "@/components/NewRecipeForm.vue";

export default Vue.extend({
  name: "NewRecipe",
  components: {
    NewRecipeForm
  }
});
</script>
<style type="text/css">
.container {
  width: 60%;
}
</style>
