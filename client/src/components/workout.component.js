import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


function Exercise(props) {
    return props.exercises.map(function(currentExercise,i){
        return (
            <li>
                <span className="font-weight-bold">{currentExercise.exercise_name}: </span> 
                <span className="font-italic"> Sets: {currentExercise.exercise_sets}</span> 
                <span className="font-italic"> Reps: {currentExercise.exercise_reps}</span>
            </li>
        )
    })
}

const Workout = props => (
        
    <h5 className="card-title">{props.workout.workout_name}</h5>

)

export default class WorkoutPage extends Component {


    constructor(props){
        super(props);
        this.state = {workouts: []};
        this.exerciseList = this.exerciseList.bind(this);
        this.workoutList = this.workoutList.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/workouts/')
        .then(response => {
            this.setState({ workouts: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
    }

    exerciseList(exercises) {
        return exercises.map(function(currentExercise,i){
            return (
                <div className='card-text'>
                    <ul>
                        <Exercise exercise={currentExercise} key={i} />
                    </ul>
                </div>

            )
        })
    }
    handleDelete(e,id) {
        e.preventDefault();

        axios.delete('http://localhost:4000/workouts/delete/'+id)
            .then(res => {console.log(res)})

            var new_workouts= this.state.workouts.filter(function(workout){
                return workout._id !== id;
            })
    
            this.setState({workouts:new_workouts});

        
    }



    workoutList() {
        return this.state.workouts.map(function(currentWorkout, i){
            return (
            <div className='card text-white justify-content-center align-items-center text-center' style ={{backgroundColor: 'black', borderColor: 'white'}}>
                <div className='card-body'>
                    <Workout workout={currentWorkout} key={i} />
                    <Exercise exercises={currentWorkout.exercises} key={i} />
                </div>
                <Link to={"/features/workout/edit/"+currentWorkout._id} className="btn btn-dark" style={{margin: '5px'}}>Edit</Link>
                <button onClick = {e => this.handleDelete(e,currentWorkout._id)} className="btn btn-dark" style={{margin: '5px'}}>Delete</button>
            </div>
            );
        }, this)
    }


    render(){
        return (
        <div className='container-fluid' style={{backgroundColor: 'black', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100%', margin: '0'}}>
            <div className="card-columns">
                <div className='card text-white justify-content-center align-items-center text-center' style ={{backgroundColor: 'black'}}>
                <div className='card-body'>
                    <Link to='/features/workout/add' className="btn btn-dark" style={{margin: '5px'}}>Add Workout</Link>
                </div>
                </div>
                {this.workoutList()}
            </div>
        </div>
        )
        
    }
}