const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Workout = new Schema({
    workout_name: {
        type: String
    },
    exercises: [{
        exercise_name: {
            type: String
        }, 
        exercise_sets: {
            type: Number
        },
        exercise_reps: {
            type: Number
        }
    }]
});

module.exports = mongoose.model('Workout', Workout);