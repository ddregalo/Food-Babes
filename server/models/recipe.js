var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    url: String,
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

var Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;