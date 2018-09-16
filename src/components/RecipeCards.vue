<template>
    <div>
        <b-card-group deck class="align-items-top d-flex justify-content-center">
            <div v-for="(recipe, index) in recipes" :key="recipe._id" class="card-group">
                <b-card :title="recipe.title"
                :img-src="recipe.imageUrl"
                img-alt="Recipe Food Image"
                img-top
                rounded
                tag="article"
                style="max-width: 14rem;"
                class="recipe-card">
                    <p class="mb-0">
                        <span id="meal" class="mt-3">{{ recipe.meal }}</span><br/>
                        <span id="cook-time"><font-awesome-icon color="grey" icon="clock" />    {{ recipe.totalTime }} MINS</span>
                        <br/>
                        <br/>
                        <b-button size="sm" variant="primary"><a id="recipe-link-button" v-if="recipe.url" :href="recipe.url" target="_blank">SELECT</a><br/></b-button>
                    </p>
                    <div class="mt-3 mb-1">
                        <router-link id="view-recipe-button" v-bind:to="{ name: 'Recipe', params: { id: recipe._id } }">NOTES</router-link>
                    </div>
                    <router-link v-bind:to="{ name: 'UpdateRecipe', params: { id: recipe._id } }">Edit</router-link> |
                    <a href="#" @click="deleteRecipe(recipe._id, index)">Delete</a>
                </b-card>
            </div>
        </b-card-group>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import RecipeService from "../services/RecipeService";

export default Vue.extend({
  name: "RecipeCards",
  props: [],
  data() {
    return {
      recipes: [] as any[],
      ingredients: [] as any[]
    };
  },
  methods: {
    async getAllRecipes() {
      var self = this;
      try {
        const response = await RecipeService.getRecipes();
        var allRecipes = await response.data.recipes;
        await allRecipes.forEach(function(recipe: any) {
          self.ingredients.push(recipe.ingredients);
        });
        return (this.recipes = allRecipes);
      } catch (err) {
        alert("Error Message Log: " + err);
      }
    },
    async deleteRecipe(id: any, index: number) {
      await RecipeService.deleteRecipe(id);
      this.recipes.splice(index, 1);
      this.$router.push({ name: "recipes" });
    }
  },

  mounted() {
    this.getAllRecipes();
  }
});
</script>
<style scoped lang="scss">
p {
  color: black;
  font-size: 1.5em;
  margin: 0 auto;
  padding-top: 0px;
}
.align-top {
  vertical-align: top;
}
.recipe-card {
  margin: 15px;
  text-transform: capitalize;
  font-size: 0.7em;
}
#cook-time {
    color: rgb(95, 95, 95);
    font-size: 0.8em;
}
#meal {
  text-transform: uppercase;
  color: rgb(153, 153, 153);
  font-weight: 600;
  letter-spacing: 4px;
  font-size: 0.8em;
}
#recipe-link-button {
  color: white;
  margin: 0 15px 0 15px;
}
#view-recipe-button {
//   color: #42b983;
  font-size: 1.2em;
}
</style>
