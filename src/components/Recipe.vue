<template>
  <div class="container mt-2">
    <hr/>
    <div class="row mt-5">
      <div class="col-xs-8 image">
        <b-img class="" rounded :src="recipe.imageUrl" fluid alt="Recipe Main Image"/>
      </div>
      <div class="col-xs-4 pl-5 recipe-text">
        <h4>
          {{recipe.title}}
          <span class="ml-2" v-if="recipe.url"><a :href="recipe.url" target="_blank"><font-awesome-icon color="#42b983" size="2x" icon="link" /></a></span>
        </h4>
        <p class="label-title">DESCRIPTION</p>
        <span>{{ recipe.description }}</span><br/>
        <div>
          <div class="row d-flex justify-content-left group">
            <div class="mr-5">
              <p class="label-title">MEAL</p>
              <span>{{ recipe.meal }}</span><br/>
            </div>
            <div>
              <p class="label-title mr-5">CUISINE</p>
              <span>{{ recipe.cuisine }}</span><br/>
            </div>
            <div>
              <p class="label-title">TIME TO TABLE</p>
              <span><font-awesome-icon class="mr-2" color="grey" icon="clock" /> {{ recipe.totalTime }}</span><br/>
            </div>
          </div>  
        </div>
        <p class="label-title">PREP TIME</p>
        <span>{{ recipe.prepTime }}</span><br/>
        <p class="label-title">COOK TIME</p>
        <span>{{ recipe.cookTime }}</span><br/>
        <p class="label-title">INGREDIENTS</p>
        <span style="display: inline;" v-for="(ingredient, index) in recipe.ingredients" :key="index">
          <span class="mr-3">{{ ingredient.item }}</span>
          <span>{{ ingredient.quantity }}</span><br>
        </span>
        <p class="label-title">METHOD</p>
        <span>{{ recipe.method }}</span>
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

span {
  font-size: 14px;
}

.align-top {
  vertical-align: top;
}

.container {
  width: 70%;
}

.group {
  margin-left: 1px;
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
  max-width: 500px;
}

.label-title {
  color: rgb(133, 132, 132);
  font-size: 0.7em;
  font-weight: 600;
  margin: 10px 0 0 0;
}
</style>
