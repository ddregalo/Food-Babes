const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const Recipe = require('../models/recipe.js')
require('dotenv').config();
const PUSHER = require('pusher');
const { PUSHER_APP_ID, PUSHER_KEY, PUSHER_SECRET, CLUSTER, TIME } = process.env;

const pusher = new PUSHER({
  appId: PUSHER_APP_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: CLUSTER,
  encrypted: true
});

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
  Recipe.find({}, 'url imageUrl title description meal cuisine totalTime prepTime cookTime ingredients.item ingredients.quantity method', function (error, recipes) {
    if (error) {
      throw new Error("An error occured getting all recipes: " + error);
    };
    res.send({
      recipes: recipes
    });
  }).sort({_id:-1})
})

app.get('/recipes/:id', (req, res) => {
  var db = req.db;
  Recipe.findById(req.params.id, 'url imageUrl title description meal cuisine totalTime prepTime cookTime ingredients.item ingredients.quantity method', function (error, recipe) {
    if (error) {
      throw new Error("An error occured locating the recipe // Error Msg:  " + error);
    };
    res.send(recipe);
  })
});

app.post('/recipes', (req, res) => {
  const db = req.db;
  const recipeUrl = req.body.url;
  const recipeImageUrl = req.body.imageUrl;
  const recipeTitle = req.body.title;
  const recipeDescription = req.body.description;   
  const recipeMeal = req.body.meal;
  const recipeCuisine = req.body.cuisine;
  const recipeTotalTime = req.body.totalTime;
  const recipePrepTime = req.body.prepTime;
  const recipeCookTime = req.body.cookTime;
  const recipeIngredients = req.body.ingredients;
  const recipeMethod = req.body.method;

  var new_recipe = new Recipe({
    url: recipeUrl,
    imageUrl: recipeImageUrl,
    title: recipeTitle,
    description: recipeDescription,
    meal: recipeMeal,
    cuisine: recipeCuisine,
    totalTime:recipeTotalTime,
    prepTime: recipePrepTime,
    cookTime: recipeCookTime,
    ingredients: recipeIngredients,
    method: recipeMethod
  });

  new_recipe.save(function (error) {
    if (error) {
      throw new Error("An error occured trying to save the recipe // Error Msg: :" + error);
    }
    res.send({
      success: true,
      message: 'Post saved successfully!'
    });
  });
});

app.put('/recipes/:id', (req, res) => {
  var db = req.db;

  Recipe.findById(req.body.id, 'url imageUrl title description meal cuisine totalTime prepTime cookTime ingredients.item ingredients.quantity method', function (error, recipe) {
    if (error) { 
      throw new Error("An error occured locating the recipe to update // Error Msg: " + error);
    }
    recipe.url = req.body.url;
    recipe.imageUrl = req.body.imageUrl;
    recipe.title = req.body.title;
    recipe.description = req.body.description;
    recipe.meal = req.body.meal;
    recipe.cuisine = req.body.cuisine;
    recipe.totalTime = req.body.totalTime;
    recipe.prepTime = req.body.prepTime;
    recipe.cookTime = req.body.cookTime;
    recipe.ingredients = req.body.ingredients;
    recipe.method = req.body.method;

    recipe.save(function (error) {
      if (error) {
        throw new Error("Error saving updated recipe //   " + error);
      }
      res.send({
        success: true
      });
    });
  });
})

app.delete('/recipes/:id', (req, res) => {
  var db = req.db;
  Recipe.remove({
    _id: req.params.id
  }, function(err, post){
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

app.listen(process.env.PORT || 8081)