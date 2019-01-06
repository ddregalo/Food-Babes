import Vue from "vue";
import Vuex from "vuex";
import RecipeService from '@/services/RecipeService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cuisines: [
      { text: "Select One", value: null },
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
      { text: "Select One", value: null },
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
