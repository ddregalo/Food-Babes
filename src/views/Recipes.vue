<template>
    <div class="recipes">
        <div class="title">
            <h1>recipes </h1>
            <div class="new-recipe-link">
                <router-link to="/recipes/new">New Recipe</router-link>
            </div>
        </div>
        <div v-for="recipe in recipes" :key="recipe._id">
            <p>
                <span><b>{{ recipe.title }}</b></span><br/>
                <span>{{ recipe.description }}</span><br/>
                <span>{{ recipe.meal }}</span><br/>
                <span>{{ recipe.cuisine }}</span><br/>
                <span>{{ recipe.totalTime }}</span><br/>
                <span>{{ recipe.prepTime }}</span><br/>
                <span>{{ recipe.cookTime }}</span><br/>
                <span>{{ recipe && recipe.ingredients && recipe.ingredients.item }}</span><br/>
                <span>{{ recipe && recipe.ingredients && recipe.ingredients.quantity }}</span><br/>
                <span>{{ recipe.method }}</span>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import RecipeService from "../services/RecipeService";

    export default Vue.extend({
        props: [],
        data() {
            return {
                recipes: [],
            }
        },
        methods: {
            async getAllRecipes () {
                try {
                    const response = await RecipeService.getRecipes();
                    return this.recipes = response.data.recipes;
                }
                catch (err)
                {
                    alert("Error Message Log: " + err)
                }   
            }
        },

        mounted() {
            this.getAllRecipes()
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
p {
    color: black;
}

.new-recipe-link {
    margin: 50px;
}
</style>