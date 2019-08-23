import Vue from "vue";
import Vuex from "vuex";
import RecipeService from '@/services/RecipeService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cuisines: [
      "Choose the cuisine",
      "American",
      "Asian",
      "British",
      "Chinese",
      "Desert",
      "French",
      "Indian",
      "Italian",
      "Mexican",
      "Middle-Eastern",
      "Other"
    ],
    meals: [
      "Choose a meal",
      "Breakfast",
      "Lunch",
      "Snack",
      "Dinner",
      "Desert"
    ],
  },
  mutations: {},
  actions: {}
});
