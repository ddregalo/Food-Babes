<template>
    <div>
      <div class="search-wrapper mb-5">
        <input type="text" v-model="search" placeholder="Search recipes..."/>
      </div>
      <b-card-group deck class="align-items-top d-flex justify-content-center">
          <div v-for="(recipe, index) in filteredRecipes" :key="recipe._id" class="card-group">
              <b-card :title="recipe.title"
              :img-src="recipe.imageUrl"
              img-alt="Recipe Food Image"
              img-top
              img-fluid
              rounded
              tag="article"
              style="max-width: 15rem;"
              class="recipe-card">
                <div>
                    <p id="cuisine">{{ recipe.cuisine }}</p><br/>
                    <span id="cook-time"><span id="meal">{{ recipe.meal }}</span><font-awesome-icon color="grey" icon="clock" />    {{ recipe.totalTime }} MINS</span>
                    <br/>
                    <br/>
                    <b-button size="sm" variant="primary" class="recipe-link-button"><a class="recipe-link" v-if="recipe.url" :href="recipe.url" target="_blank">SELECT</a></b-button>
                </div>
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
  data() {
    return {
      search: "",
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
  computed: {
    filteredRecipes: function(): any[] {
      return this.recipes.filter(recipe => {
        const recipeIngredients = [] as any[];
        recipe.ingredients.forEach(function(ingredient: any) {
          recipeIngredients.push(ingredient.item.toLowerCase());
        });
        var cuisine = recipe.cuisine.toLowerCase();
        var title = recipe.title.toLowerCase();
        return recipeIngredients.join(" ").match(this.search.toLowerCase()) ||
          cuisine.match(this.search.toLowerCase()) ||
          title.match(this.search.toLowerCase());
      });
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
.search-wrapper {
  position: relative;
  input {
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px;
    padding: 4px 12px;
    color: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(0, 0, 0, 0.12);
    transition: 0.15s all ease-in-out;
    background: white;
    width: 30%;
    &:focus {
      outline: none;
      transform: scale(1.05);
      & + label {
        font-size: 10px;
        transform: translateY(-24px) translateX(-12px);
      }
    }
    &::-webkit-input-placeholder {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
      font-weight: 100;
    }
  }
}
#cook-time {
  color: rgb(95, 95, 95);
  font-size: 1.2em;
  padding-top: 0px;
}
#cuisine {
  padding-top: 5px;
  text-transform: uppercase;
  color: rgb(170, 169, 169);
  font-weight: 400;
  letter-spacing: 4px;
  font-size: 1.2em;
}
#meal {
  padding-right: 10px;
  text-transform: uppercase;
  color: rgb(153, 153, 153);
  font-weight: 500;
  letter-spacing: 4px;
  font-size: 1em;
}
.recipe-link {
  color: white;
  margin: 0 15px 0 15px;
}

.recipe-link-button {
  color: white;
  background-color: rgb(41, 59, 212);
}

.view-recipe-button {
  //   color: #42b983;
  font-size: 1.2em;
}
</style>
