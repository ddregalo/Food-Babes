import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/recipes",
      name: "recipes",
      component: () =>
        import(/* webpackChunkName: "recipes" */ "./views/Recipes.vue")
    },
    {
      path: "/recipes/new",
      name: "NewRecipe",
      component: () =>
        import(/* webpackChunkName: "newrecipe" */ "./components/NewRecipe.vue")
    },
    {
      path: "/recipes/:id",
      name: "Recipe",
      // component: Recipe
      component: () =>
        import(/* webpackChunkName: "recipe" */ "./components/Recipe.vue")
    },
    {
      path: "/recipes/:id",
      name: "UpdateRecipe",
      // component: UpdateRecipe
      component: () =>
        import(/* webpackChunkName: "updateRecipe" */ "./components/UpdateRecipe.vue")
    }
  ]
});
