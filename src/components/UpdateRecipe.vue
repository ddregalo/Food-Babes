<template>
  <div class="new-recipe">
    <h1>Edit Recipe</h1>
    <div class="container">
        <UpdateRecipeForm></UpdateRecipeForm>
    </div>
  </div>
</template>

<script type="ts">
    import Vue from "vue";
    import RecipeService from "@/services/RecipeService";
    import UpdateRecipeForm from "@/components/UpdateRecipeForm.vue";
    export default Vue.extend({
    name: 'UpdateRecipe',
    components: {
        UpdateRecipeForm
    }
    })
</script>

<style type="text/scss">
h1 {
    font-size: 5em;
    color: #4d7ef7;
    margin-top: 0;
    margin-bottom: 10px;
    letter-spacing: 5px;
    text-transform: uppercase;
}
.container {
  width: 50%;
}
</style>