<template>
    <div>
        <b-card-group deck class="align-items-center d-flex justify-content-center">
            <div v-for="(recipe, index) in recipes" :key="recipe._id" class="card-group">
                <b-card :title="recipe.title"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Default Recipe Food Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="recipe-card">
                    <p>
                        <a :href="recipe.url">{{ recipe.url }}</a><br/>
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
                    <!-- <router-link to="/recipe/:id"><b-button variant="primary">SELECT</b-button></router-link> -->
                    <router-link v-bind:to="{ name: 'EditRecipe', params: { id: recipe._id } }">Edit</router-link> |
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
.recipe-card {
    margin: 15px;
}
</style>
