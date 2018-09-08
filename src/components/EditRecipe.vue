<template>
  <div class="new-recipe">
    <h1>Edit Recipe</h1>
      <div class="form">
        <h4 class="form-subtitle">GENERAL DETAILS</h4>
        <div>
          <input type="text" name="url" :placeholder="url" v-model="url">
        </div>
        <div>
          <input type="text" name="title" :placeholder="title" v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" :placeholder="description" v-model="description"></textarea>
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
          <input type="number" name="totalTime" :placeholder="totalTime" v-model="totalTime">
        </div>
        <div>
          <input type="number" name="prepTime" :placeholder="prepTime" v-model="prepTime">
        </div>
        <div>
          <input type="number" name="cookTime" :placeholder="cookTime" v-model="cookTime">
        </div>
        <h4 class="form-subtitle">INGREDIENTS</h4>
        <div>
          <input type="text" name="item" :placeholder="ingredients.item" v-model="ingredients.item">
          <input type="number" name="quantity" :placeholder="ingredients.quantity" v-model="ingredients.quantity">
        </div>

        <h4 class="form-subtitle">METHOD</h4>
        <div>
          <input type="text" name="method" :placeholder="method" v-model="method">
        </div>
        <div>
          <button class="app_post_btn" @click="updateRecipe">Update</button>
        </div>
      </div>
  </div>
</template>

<script>
    import RecipeService from '@/services/RecipeService'
    export default {
    name: 'EditRecipe',
    data () {
        return {
            url: '',
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
        async getRecipe () {            const response = await RecipeService.getRecipe({id: this.$route.params.id})
                .then(response => {
                    this.url = response.data.url;
                    this.title = response.data.title;
                    this.description = response.data.description;
                    this.meal = response.data.meal;
                    this.cuisine = response.data.cuisine;
                    this.totalTime = response.data.totalTime;
                    this.prepTime = response.data.prepTime;
                    this.cookTime = response.data.cookTime;
                    this.ingredients.item = response.data.ingredients.item
                    this.ingredients.quantity = response.data.ingredients.quantity
                    this.method = response.data.method;
                })
                .catch(function (error) {
                    console.log("GET Recipe response:    " + response);
                    throw new Error("Error Getting Recipe From Database // Error Msg:  " + (error));
            });    
        },
        async updateRecipe () {
            await RecipeService.updateRecipe({
                id: this.$route.params.id,
                url: this.url,
                title: this.title,
                description: this.description,
                meal: this.meal,
                cuisine: this.cuisine,
                totalTime: this.totalTime,
                prepTime: this.prepTime,
                cookTime: this.cookTime,
                ingredients: {
                    item: this.ingredients.item,
                    quantity: this.ingredients.quantity
                },
                method: this.method
            })
            this.$router.push({ name: 'recipes' })
        }
    },

    mounted() {
        this.getRecipe();
    }

    }
</script>

<style type="text/css">
h1 {
    font-size: 5em;
    color: #4d7ef7;
    margin-top: 0;
    margin-bottom: 10px;
    letter-spacing: 5px;
    text-transform: uppercase;
}
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