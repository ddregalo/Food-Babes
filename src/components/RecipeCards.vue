<template>
    <div class="">
        <b-card-group deck class="align-items-top d-flex justify-content-center">
            <div v-for="(recipe, index) in recipes" :key="recipe._id" class="card-group">
                <b-card :title="recipe.title"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Default Recipe Food Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="recipe-card">
                    <p>
                        <a v-if="recipe.url" :href="recipe.url" target="_blank">RECIPE SOURCE</a><br/>
                        <span>{{ recipe.meal }}</span><br/>
                        <span>{{ recipe.cuisine }}</span><br/>
                        <span>{{ recipe.totalTime }}</span><br/>
                    </p>
                    <div class="mb-3">
                        <b-button variant="primary"><router-link id="view-recipe-button" v-bind:to="{ name: 'Recipe', params: { id: recipe._id } }">SELECT</router-link></b-button>
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
        name: 'RecipeCards',
        props: [],
        data() {
            return {
                recipes: [] as any[],
                ingredients: [] as any[]
            }
        },
        methods: {
            async getAllRecipes () {
                var self = this;
                try {
                    const response = await RecipeService.getRecipes();
                    var allRecipes = await response.data.recipes;
                    await allRecipes.forEach(function(recipe: any) {
                        self.ingredients.push(recipe.ingredients);
                    });
                    return this.recipes = allRecipes;
                }
                catch (err)
                {
                    alert("Error Message Log: " + err)
                }   
            },
            async deleteRecipe (id: any, index: number) {
                await RecipeService.deleteRecipe(id);
                this.recipes.splice(index, 1);
                this.$router.push({ name: 'recipes' });
            }
        },

        mounted() {
            this.getAllRecipes()
        }
    });
</script>
<style scoped lang="scss">
p {
    color: black;
}
.align-top {
    vertical-align: top;
}
.recipe-card {
    margin: 15px;
    text-transform: capitalize;
}
#view-recipe-button {
    color: white
}
</style>
