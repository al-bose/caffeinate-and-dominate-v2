const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const workoutRoutes = express.Router();
const mealRoutes = express.Router();
const liftRoutes = express.Router();
const nutritionRoutes = express.Router();
const PORT = process.env.PORT || 4000;
const url1 = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/workouts';
const url2 = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/meals';
const url3 = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lifts';
const url4 = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nutrition';

let Workout = require('./models/workout.model');
let Meal = require('./models/meal.model');
let Lift = require('./models/lift.model');
let Nutrition = require('./models/nutrition.model');
require("dotenv").config()

const path = require("path");


app.use(cors());
app.use(bodyParser.json());
app.use('/workouts', workoutRoutes);
app.use('/meals', mealRoutes);
app.use('/lifts', liftRoutes);
app.use('/nutrition', nutritionRoutes);
app.use(express.static(path.join(__dirname, "client", "build")))

mongoose.connect(url1, { useNewUrlParser: true });
mongoose.connect(url2, { useNewUrlParser: true });
mongoose.connect(url3, { useNewUrlParser: true });
mongoose.connect(url4, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})


nutritionRoutes.route('/').get(function(req, res) {
    Nutrition.find(function(err, nutrition) {
        if (err) {
            console.log(err);
        } else {
            res.json(nutrition);
        }
    });
});


nutritionRoutes.route('/add').post(function(req, res) {
    let nutrition = new Nutrition(req.body);
    nutrition.save()
        .then(nutriton => {
            res.status(200).json({'nutriton': 'nutrition added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new nutrition failed');
        });
});



nutritionRoutes.route('/delete/:id').delete(function(req, res) {
    Nutrition.deleteOne({
        _id: req.params.id
    }, function(err){
        if(err) {
            return res.send(err);
        } else {
            console.log("successfully deleted")
        }
    })
});

liftRoutes.route('/').get(function(req, res) {
    Lift.find(function(err, lifts) {
        if (err) {
            console.log(err);
        } else {
            res.json(lifts);
        }
    });
});


liftRoutes.route('/add').post(function(req, res) {
    let lift = new Lift(req.body);
    lift.save()
        .then(lift => {
            res.status(200).json({'lift': 'lift added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new lift failed');
        });
});



liftRoutes.route('/delete/:id').delete(function(req, res) {
    Lift.deleteOne({
        _id: req.params.id
    }, function(err){
        if(err) {
            return res.send(err);
        } else {
            console.log("successfully deleted")
        }
    })
});

mealRoutes.route('/').get(function(req, res) {
    Meal.find(function(err, meals) {
        if (err) {
            console.log(err);
        } else {
            res.json(meals);
        }
    });
});


mealRoutes.route('/add').post(function(req, res) {
    let meal = new Meal(req.body);
    meal.save()
        .then(meal => {
            res.status(200).json({'meal': 'meal added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new meal failed');
        });
});

mealRoutes.route('/delete/:id').delete(function(req, res) {
    Meal.deleteOne({
        _id: req.params.id
    }, function(err) {
        if(err) {
            return res.send(err);
        } else {
            console.log("successfully deleted")
        }
    })
});



workoutRoutes.route('/').get(function(req, res) {
    Workout.find(function(err, workouts) {
        if (err) {
            console.log(err);
        } else {
            res.json(workouts);
        }
    });
});
workoutRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Workout.findById(id, function(err, workout) {
        res.json(workout);
    });
});



workoutRoutes.route('/update/:id').post(function(req, res) {
    Workout.findById(req.params.id, function(err, workout) {
        if (!workout)
            res.status(404).send("data is not found");
        else
            workout.workout_name = req.body.workout_name;
            workout.exercises = req.body.exercises;

            workout.save().then(todo => {
                res.json('Workout updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

workoutRoutes.route('/add').post(function(req, res) {
    let workout = new Workout(req.body);
    workout.save()
        .then(workout => {
            res.status(200).json({'workout': 'workout added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new workout failed');
        });
});

workoutRoutes.route('/delete/:id').delete(function(req, res) {
    Workout.deleteOne({
        _id: req.params.id
    }, function(err) {
        if(err) {
            return res.send(err);
        } else {
            console.log("successfully deleted")
        }
    })
});



app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


