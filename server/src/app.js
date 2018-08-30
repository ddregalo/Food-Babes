const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

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