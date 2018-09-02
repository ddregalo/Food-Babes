const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan')

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

app.listen(process.env.PORT || 8081)