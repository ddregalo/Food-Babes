<template>
    <div>
        <div class="title">
            <h1>recipes</h1>
            <div class="new-recipe-link">
                <router-link to="/recipes/new">New Recipe</router-link>
            </div>
        </div>
        <div class="mt-5">
            <RecipeCards></RecipeCards>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import RecipeService from "../services/RecipeService";
import RecipeCards from "@/components/RecipeCards.vue";

export default Vue.extend({
  components: {
    RecipeCards
  }
});
</script>

<style>
h1 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 100px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #42b983;
}

.new-recipe-link {
  margin: 20px;
}
</style>
