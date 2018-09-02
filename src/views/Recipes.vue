<template>
    <div class="recipes">
        <div class="title">
            <h1>recipes</h1>
        </div>
        <div v-for="recipe in recipes" :key="recipe.id">
            <p>
                <span><b>{{ recipe.title }}</b></span><br />
                <span>{{ recipe.description }}</span>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import RecipeService from "@/services/RecipeService.js"
    export default Vue.extend({
        props: [],
        data() {
            return {
                recipes: []
            }
        },
        methods: {
            async getRecipes () {
                const response = await RecipeService.getRecipes()
                this.recipes = response.data
            }
        },
        computed: {
            // exclamationMarks(): string {
            //     return Array(this.enthusiasm + 1).join('!');
            // }
        },

        created() {
            this.getRecipes()
        }
    });
</script>

<style>
h1 {
    margin-top: 0;
    font-size: 100px;
    letter-spacing: 5px;
    text-transform: uppercase;
    color: #42b983;
}
</style>






import PostsService from '@/services/PostsService'
export default {
  name: 'posts',
  data () {
    return {
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      const response = await PostsService.fetchPosts()
      this.posts = response.data
    }
  }
}