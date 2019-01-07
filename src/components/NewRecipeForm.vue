<template>
    <b-form @submit="onSubmit">
         <h4 class="form-subtitle">GENERAL DETAILS</h4>
        <b-form-group inline id="recipe-form-group-1" label="URL" label-for="url">
            <b-form-input id="url" type="text" v-model="recipe.url" placeholder="RECIPE URL"></b-form-input>
        </b-form-group>
        <b-form-group id="recipe-form-group-10" label="IMAGE URL" label-for="imageUrl">
            <b-form-input id="imageUrl" class="form-input" type="text" v-model="recipe.imageUrl" placeholder="RECIPE IMGAGE URL">{{recipe.imageUrl}}</b-form-input>
        </b-form-group>
        <b-form-group inline id="recipe-form-group-2" label="TITLE" label-for="title">
            <b-form-input id="title" type="text" v-model="recipe.title" placeholder="RECIPE URL"></b-form-input>
        </b-form-group>
        <b-form-group inline id="recipe-form-group-3" label="DESCRIPTION" label-for="title">
            <b-form-textarea id="description" type="text" v-model="recipe.description" placeholder="A SHORT DESCRIPTION OF THE RECIPE..."></b-form-textarea>
        </b-form-group>
        <b-form-group inline id="recipe-form-group-4" label="MEAL" label-for="meal">
            <b-form-select id="meal" :options="meals" required v-model="recipe.meal"></b-form-select>
        </b-form-group>
        <b-form-group inline id="recipe-form-group-5" label="CUISINE" label-for="cuisine">
            <b-form-select id="cuisine" :options="cuisines" required v-model="recipe.cuisine"></b-form-select>
        </b-form-group>
        <div>
            <h4 class="form-subtitle">TIMING</h4>
        </div>
        <b-form-group inline id="recipe-form-group-6" label="TOTAL TIME" label-for="totalTime">
            <b-form-input id="totalTime" type="number" v-model="recipe.totalTime" placeholder="TOTAL TIME TO COOK AND PREP IN MINUTES"></b-form-input>
        </b-form-group>
        <b-form-group inline id="recipe-form-group-7" label="PREP TIME" label-for="prepTime">
            <b-form-input id="prepTime" type="number" v-model="recipe.prepTime" placeholder="TIME TO PREP IN MINUTES"></b-form-input>
        </b-form-group>
        <b-form-group inline id="recipe-form-group-8" label="COOK TIME" label-for="cookTime">
            <b-form-input id="cookTime" type="number" v-model="recipe.cookTime" placeholder="TIME TO COOK IN MINUTES"></b-form-input>
        </b-form-group>
        <h4 class="form-subtitle">INGREDIENTS</h4>
        <b-form-group>
            <div class="container-center">
                <div class="card mb-3" v-for="(ingredient, key) in recipe.ingredients" :key="key">
                    <div class="card-body">
                        <span class="float-right" style="cursor: pointer" @click="removeIngredient(index)">
                        X
                        </span>
                        <div class="ingredient-form form horizontal">
                        <b-form-input type="text" class="form-control mb-3 mr-5" style="width: 50%; display: inline;" placeholder="INGREDIENT" v-model="recipe.ingredients[key].item"></b-form-input>
                        <b-form-input type="number" class="form-control mb-3" style="width: 30%; display: inline;" placeholder="QUANTITY" v-model="recipe.ingredients[key].quantity"></b-form-input>
                        </div>
                    </div>
                </div>
                <div class="btn btn-primary mt-2 mb-5" @click="addIngredient">
                ADD INGREDIENT
                </div>
            </div>
        </b-form-group>
        <b-form-group inline id="recipe-form-group-9" label="METHOD" label-for="method">
            <b-form-input id="method" type="text" v-model="recipe.method" placeholder="HOW TO MAKE THIS..."></b-form-input>
        </b-form-group>
        <div>
            <b-button type="submit" variant="primary">Submit</b-button>
        </div>
    </b-form>
</template>

<script type="ts">
import Vue from 'vue';
import Vuex from 'vuex';
import { store } from '@/store.ts';
import RecipeService from "@/services/RecipeService";

Vue.use(Vuex);

export default Vue.extend({
  name: "NewRecipeForm",
  data() {
    return {
      recipe: {
        url: "",
        imageUrl: "",
        title: "",
        description: "",
        meal: "",
        cuisine: "",
        totalTime: "",
        prepTime: "",
        cookTime: "",
        ingredients: [],
        method: ""
      },
      meals: this.$store.state.meals,
      cuisines: this.$store.state.cuisines,
    };
  },
  methods: {
    addIngredient: function() {
      this.recipe.ingredients.push({
        item: "",
        quantity: ""
      });
    },
    removeIngredient: function(index) {
      this.recipe.ingredients.splice(index, 1);
    },
    async onSubmit(evt) {
      evt.preventDefault();
      await RecipeService.addRecipe({
        url: this.recipe.url,
        imageUrl: this.recipe.imageUrl,
        title: this.recipe.title,
        description: this.recipe.description,
        meal: this.recipe.meal,
        cuisine: this.recipe.cuisine,
        totalTime: this.recipe.totalTime,
        prepTime: this.recipe.prepTime,
        cookTime: this.recipe.cookTime,
        ingredients: this.recipe.ingredients,
        method: this.recipe.method
      });
      this.$router.push({ name: "recipes" });
    }
  }
});
</script>
<style type="text/scss">
</style>
