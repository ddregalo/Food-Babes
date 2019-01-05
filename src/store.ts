import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    meals: [
      { text: "Select One", value: null },
      "Breakfast",
      "Lunch",
      "Snack",
      "Dinner",
      "Desert"
    ],
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
    ]
  },
  mutations: {},
  actions: {}
});
