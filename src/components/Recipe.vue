<template>
    <div class="container">
        <b-card-group deck class="align-items-top d-flex justify-content-center">
            <div class="card-group">
                <b-card :title="recipe.title"
                :img-src="recipe.imageUrl"
                img-alt="Default Recipe Food Image"
                img-top
                tag="article"
                style="max-width: 30rem;"
                class="recipe-card">
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
            }
        },
        methods: {
            async getRecipe () {
                const response = await RecipeService.getRecipe({id: this.$route.params.id})
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
                    .catch(function (error) {
                        throw new Error("Error Getting Recipe From Database //  " + (error));
                    });    
            }
            // async deleteRecipe (id: any, index: number) {
            //     await RecipeService.deleteRecipe(id);
            //     this.recipe.splice(index, 1);
            //     this.$router.push({ name: 'recipes' });
            // }
        },

        mounted() {
            this.getRecipe()
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
.container {
    width: 100%;
}
.recipe-card {
    margin: 15px;
}
</style>
