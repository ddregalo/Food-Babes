const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const recipe = require('../models/recipe.js')

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


mongoose.connect('mongodb://localhost:27017/recipes');

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.get('/recipes', (req, res) => {
    res.send(
      [{
        title: "Lasagna",
        category: "Dinner",
        cuisine: "Italian",
        description: "Vegetarian lasgna bake with tomatoe sauce and beschamel.",
        totalTime: 60,
        prepareTime: 25,
        cookTime: 35
      }]
    )
  })

  app.post('/recipes', (req, res) => {
    var db = req.db;
    var recipeTitle = req.body.title;
    var recipeDescription = req.body.description;
    var new_recipe = new Recipe({
      title: recipeTitle,
      description: recipeDescription
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

app.listen(process.env.PORT || 8081)