const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Lift = new Schema({
    bench_press: {
        type: Number
    },
    squat: {
        type: Number
    },
    deadlift: {
        type: Number
    },
    date: {
        type: String
    }

});

module.exports = mongoose.model('Lift', Lift);