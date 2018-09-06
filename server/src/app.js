const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const Recipe = require('../models/recipe.js')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json({extended: true}))
app.use(cors())

mongoose.connect('mongodb://localhost:27017/recipes');

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.get('/recipes', (req, res) => {
  Recipe.find({}, 'title description meal cuisine totalTime prepTime cookTime ingredients.item ingredients.quantity method', function (error, recipes) {
    if (error) { console.error("Runtime error occured: " + error); }
    res.send({
      recipes: recipes
    })
  }).sort({_id:-1})
})

app.post('/recipes', (req, res) => {
  var db = req.db;
  var recipeTitle = req.body.title;
  var recipeDescription = req.body.description;   
  var recipeMeal = req.body.meal;
  var recipeCuisine = req.body.cuisine;
  var recipeTotalTime = req.body.totalTime;
  var recipePrepTime = req.body.prepTime;
  var recipeCookTime = req.body.cookTime;
  var recipeIngredientItem = req.body.ingredients.item;
  var recipeIngredientQuantity = req.body.ingredients.quantity;
  var recipeMethod = req.body.method;

  var new_recipe = new Recipe({
    title: recipeTitle,
    description: recipeDescription,
    meal: recipeMeal,
    cuisine: recipeCuisine,
    totalTime:recipeTotalTime,
    prepTime: recipePrepTime,
    cookTime: recipeCookTime,
    ingredients:
        {
            item: recipeIngredientItem,
            quantity: recipeIngredientQuantity
        },
    method: recipeMethod
  })

  new_recipe.save(function (error) {
    if (error) {
      console.log("*****The following runtime error occured:" + error)
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    })
  })
})

app.put('/recipes/edit/:id', (req, res) => {
  var db = req.db;
  Recipe.findById(req.params.id, 'title description meal cuisine totalTime prepTime cookTime ingredients.item ingredients.quantity method', function (error, recipe) {
    if (error) { console.error(error); }

    recipe.title = req.body.title;
    recipe.description = req.body.description;
    recipe.meal = req.body.meal;
    recipe.cuisine = req.body.cuisine;
    recipe.totalTime = req.body.totalTime;
    recipe.prepTime = req.body.prepTime;
    recipe.cookTime = req.body.cookTime;
    recipe.ingredients.item = req.body.ingredients.item;
    recipe.ingredients.quantity = req.body.ingredients.quantity;
    recipe.method = req.body.method;

    post.save(function (error) {
      if (error) {
        alert("RunTime Error //   " + error);
      }
      res.send({
        success: true
      })
    })
  })
})

app.listen(process.env.PORT || 8081)