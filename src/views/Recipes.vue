<template>
    <div>
        <div class="title">
            <h1>recipes</h1>
            <div class="new-recipe-link">
              <!-- <b-button class="btn btn-outline-success my-2 my-sm-0"> -->
                <router-link to="/recipes/new"><font-awesome-icon size="2x" class="link" style="color:rgb(41, 59, 212);" icon="plus-circle" />
                  <span class="link-text">NEW RECIPE</span>
                </router-link>
              <!-- </b-button> -->
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

a:hover {
  text-decoration: none;
}

.btn {
  border-radius: 10px;
}

.link {
  margin: 0px 10px 0px 10px;
  vertical-align: middle;
}

.link-text {
  color: rgb(41, 59, 212);
  font-weight: 700;
  letter-spacing: 2px;
  font-size: 1.1em;
}

.new-recipe-link {
  margin: 20px;
  padding-top: 10px;
}
</style>
