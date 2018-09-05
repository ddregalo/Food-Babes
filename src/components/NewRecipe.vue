<template>
  <div class="new-recipe">
    <h1>Add A New Recipe</h1>
      <div class="form">
        <h4 class="form-subtitle">GENERAL DETAILS</h4>
        <div>
          <input type="text" name="title" placeholder="TITLE..." v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="DESCRIPTION..." v-model="description"></textarea>
        </div>
        <div>
            <p class="dropdown-text">Select the type of meal from the list:</p>
            <select name="meal" v-model="meal">
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Snack">Snack</option>
                <option value="Dinner">Dinner</option>
                <option value="Desert">Desert</option>
            </select>
        </div>
        <div>
            <p class="dropdown-text">Select the type of cuisine from the list:</p>
            <select name="cuisine" v-model="cuisine">
                <option value="Italian">Italian</option>
                <option value="Chinese">Chinese</option>
                <option value="Indian">Indian</option>
                <option value="Asian">Asian</option>
                <option value="British">British</option>
                <option value="American">American</option>
                <option value="French">French</option>
                <option value="Middle-Eastern">Middle Eastern</option>
                <option value="Mexican">Mexican</option>
                <option value="Desert">Desert</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <h4 class="form-subtitle">TIMING</h4>
        <div>
          <input type="number" name="totalTime" placeholder="TOTAL TIME FROM START TO TABLE IN MINUTES..." v-model="totalTime">
        </div>
        <div>
          <input type="number" name="prepTime" placeholder="TIME IT TAKES TO PREP THE MEAL IN MINUTES..." v-model="prepTime">
        </div>
        <div>
          <input type="number" name="cookTime" placeholder="TIME IT TAKES TO COOK THE MEAL IN MINUTES..." v-model="cookTime">
        </div>
        <h4 class="form-subtitle">INGREDIENTS</h4>
        <div>
          <input type="text" name="item" placeholder="INGREDIENT" v-model="ingredients.item">
          <input type="number" name="quantity" placeholder="QUANTITY" v-model="ingredients.quantity">
        </div>

        <h4 class="form-subtitle">METHOD</h4>
        <div>
          <input type="text" name="method" placeholder="ENTER RECIPE INSTRUCTIONS..." v-model="method">
        </div>
        <div>
          <button class="app_post_btn" @click="addRecipe">Add New Recipe</button>
        </div>
      </div>
  </div>
</template>

<script>
import RecipeService from '@/services/RecipeService'
export default {
  name: 'NewRecipe',
  data () {
    return {
        title: '',
        description: '',
        meal: '',
        cuisine: '',
        totalTime: 0,
        prepTime: 0,
        cookTime: 0,
        ingredients:
        {
            item: '',
            quantity: 0
        },
        method: ''
    }
  },
  methods: {
    async addRecipe () {
      await RecipeService.addRecipe({
        title: this.title,
        description: this.description,
        meal: this.meal,
        cuisine: this.cuisine,
        totalTime: this.totalTime,
        prepTime: this.prepTime,
        cookTime: this.cookTime,
        ingredients:
        {
            item: this.ingredients.item,
            quantity: this.ingredients.quantity
        },
        method: this.method
      })
      this.$router.push({ name: 'recipes' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: black;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
