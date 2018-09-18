<template>
  <div class="container mt-2">
    <hr/>
    <div class="row mt-5">
      <div class="col-xs-8 image">
        <b-img-lazy class="" rounded :src="recipe.imageUrl" fluid alt="Recipe Main Image"/>
      </div>
      <div class="col-xs-4 pl-5 recipe-text">
        <h4>{{recipe.title}}</h4>
        <p>
          <a v-if="recipe.url" :href="recipe.url" target="_blank">RECIPE SOURCE</a><br/>
          <span>{{ recipe.description }}</span><br/>
          <span>{{ recipe.meal }}</span><br/>
          <span>{{ recipe.cuisine }}</span><br/>
          <span>{{ recipe.totalTime }}</span><br/>
          <span>{{ recipe.prepTime }}</span><br/>
          <span>{{ recipe.cookTime }}</span><br/>
          <span style="display: inline;" v-for="(ingredient, index) in recipe.ingredients" :key="index">
            <span class="mr-3">{{ ingredient.item }}</span>
            <span>{{ ingredient.quantity }}</span><br>
          </span>
          <span>{{ recipe.method }}</span>
        </p>
        <!-- <router-link v-bind:to="{ name: 'UpdateRecipe', params: { id: recipe._id } }">Edit</router-link> | -->
        <!-- <a href="#" @click="deleteRecipe(recipe._id, index)">Delete</a> -->
      </div>
    </div> 
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import RecipeService from "../services/RecipeService";

export default Vue.extend({
  name: "RecipeCards",
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
      }
    };
  },
  methods: {
    async getRecipe() {
      const response = await RecipeService.getRecipe({
        id: this.$route.params.id
      })
        .then(response => {
          this.recipe.url = response.data.url;
          this.recipe.imageUrl = response.data.imageUrl;
          this.recipe.title = response.data.title;
          this.recipe.description = response.data.description;
          this.recipe.meal = response.data.meal;
          this.recipe.cuisine = response.data.cuisine;
          this.recipe.totalTime = response.data.totalTime;
          this.recipe.prepTime = response.data.prepTime;
          this.recipe.cookTime = response.data.cookTime;
          this.recipe.ingredients = response.data.ingredients;
          this.recipe.method = response.data.method;
        })
        .catch(function(error) {
          throw new Error("Error Getting Recipe From Database //  " + error);
        });
    }
    // async deleteRecipe (id: any, index: number) {
    //     await RecipeService.deleteRecipe(id);
    //     this.recipe.splice(index, 1);
    //     this.$router.push({ name: 'recipes' });
    // }
  },

  mounted() {
    this.getRecipe();
  }
});
</script>
<style scoped lang="scss">
h4 {
  color: #2c3e50;
}

p {
  color: black;
}

.align-top {
  vertical-align: top;
}

.container {
  width: 70%;
}

.image {
  width: 40%;
  float: left;
  height: 400px;
}

.recipe-card {
  margin: 15px;
}

.recipe-text {
  text-align: left;
}
</style>
