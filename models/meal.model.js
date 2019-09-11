const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Meal = new Schema({
    meal_name: {
        type: String
    },
    meal_calories: {
        type: Number
    },
    meal_carbs: {
        type: Number
    },
    meal_fats: {
        type: Number
    },
    meal_protein: {
        type: Number
    },
    
});

module.exports = mongoose.model('Meal', Meal);