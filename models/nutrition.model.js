const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Nutrition = new Schema({

    calories: {
        type: Number
    },
    carbs: {
        type: Number
    },
    fats: {
        type: Number
    },
    protein: {
        type: Number
    },
    bodyweight: {
        type: Number
    },
    date: {
        type: String
    }

});

module.exports = mongoose.model('Nutrition', Nutrition);