var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;

var RecipeSchema = new Schema({
    url: String,
    imageUrl: String,
    title: String,
    description: String,
    meal: String,
    cuisine: String,
    totalTime: Number,
    prepTime: Number,
    cookTime: Number,
    ingredients:
    [
        {
        item: String,
        quantity: Number
        }
    ],
    method: String
});

var recipe = Mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;