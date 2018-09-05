<template>
    <div>
        <b-card title="Card Title"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Default Recipe Food Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="recipe-card">
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
            <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
        </b-card>
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
</style>
