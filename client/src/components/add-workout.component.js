import React, {Component} from 'react';
import axios from 'axios';

export default class AddWorkout extends Component {

    constructor(props){
        super(props);

        this.state = {
            workout_name : '',
            exercises : [ {exercise_name : '', exercise_sets : 0, exercise_reps : 0}]
        };

        this.onChangeWorkoutName = this.onChangeWorkoutName.bind(this);
        this.onChangeExerciseName = this.onChangeExerciseName.bind(this);
        this.onChangeExerciseSets = this.onChangeExerciseSets.bind(this);
        this.onChangeExerciseReps = this.onChangeExerciseReps.bind(this);
        this.handleAddExercise = this.handleAddExercise.bind(this);
        this.handleRemoveExercise = this.handleRemoveExercise.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }



    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Workout Description: ${this.state.workout_name}`);
        console.log(`Exercises Responsible: ${this.state.exercises}`);
     
        const newWorkout = {
            workout_name: this.state.workout_name,
            exercises: this.state.exercises,

        };

        axios.post('//caffeinate-and-dominate.herokuapp.com/workouts/add', newWorkout)
            .then(res => console.log(res.data));

        this.setState({
            workout_name : '',
            exercises : [ {exercise_name : '', exercise_sets : 0, exercise_reps : 0}]
        })
    }


    onChangeWorkoutName(e){
        this.setState({workout_name: e.target.value})
    }


   onChangeExerciseName = idx => evt => {
        const newExercises = this.state.exercises.map((exercise, sidx) => {
          if (idx !== sidx) return exercise;
          return { ...exercise, exercise_name: evt.target.value };
        });
    
        this.setState({ exercises: newExercises });
      };

    onChangeExerciseSets = idx => evt => {
        const newExercises = this.state.exercises.map((exercise, sidx) => {
          if (idx !== sidx) return exercise;
          return { ...exercise, exercise_sets: evt.target.value };
        });
    
        this.setState({ exercises: newExercises });
      };
    

    onChangeExerciseReps = idx => evt => {
        const newExercises = this.state.exercises.map((exercise, sidx) => {
          if (idx !== sidx) return exercise;
          return { ...exercise, exercise_reps: evt.target.value };
        });
    
        this.setState({ exercises: newExercises });
    };
    


    handleRemoveExercise = idx => () => {
        this.setState({
          exercises: this.state.exercises.filter((s, sidx) => idx !== sidx)
        });
      };

    handleAddExercise = () => {
        this.setState({
          exercises: this.state.exercises.concat([{ exercise_name : '', exercise_sets : 0, exercise_reps : 0}])
        });
      };



    render() {
        return (
            <div className='container-fluid' style={{backgroundColor: 'black', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100%'}}>
                <section className='inner row justify-content-center align-items-center text-center' style ={{height: '100%'}}>
                  <div className = 'col align-items-end'>
                <h3 className='text-white justify-content-center align-items-center text-center'>Create Workout</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row text-white justify-content-center align-items-center text-center"> 
                        <label className = "col-sm-2 col-form-label font-weight-bold"> Workout Name: </label>
                        <div className='col-sm-2'>
                        <input type="text"
                                className="form-control"
                                value={this.state.workout_name}
                                onChange={this.onChangeWorkoutName} />
                        </div>
                    </div>
                    <h5 className='text-white justify-content-center align-items-center text-center'>Add Exercises</h5>
                    {this.state.exercises.map(function(currentExercise,i){
                            return(
                            <div className="form-group row justify-content-center align-items-center text-center"> 
                                <label className = "col-sm-1 col-form-label text-white font-weight-bold"> Name: </label>
                                <div className='col-sm-2'> 
                                <input  type="text"
                                className="form-control"
                                value={currentExercise.exercise_name}
                                onChange={this.onChangeExerciseName(i)} />
                                </div> 
                               

                                <label className = "col-sm-1 col-form-label text-white font-weight-bold"> Sets: </label>
                                <div className='col-sm-2'> 
                                <input  type="number"
                                className="form-control"
                                value={currentExercise.exercise_sets}
                                onChange={this.onChangeExerciseSets(i)} />
                                </div>
                                
                                <label className = "col-sm-1 col-form-label text-white font-weight-bold"> Reps: </label>
                                <div className='col-sm-2'> 
                                <input  type="number"
                                className="form-control"
                                value={currentExercise.exercise_reps}
                                onChange={this.onChangeExerciseReps(i)} />
                                </div>
                                
                                <button
                                type="button"
                                onClick={this.handleRemoveExercise(i)}
                                className="btn text-white"> - Remove </button>
                            </div>
                            );
                        },this)}
                        <button type="button" onClick={this.handleAddExercise} className="btn text-white" >+ New</button>
                        <div className="form-group  justify-content-center align-items-center text-center">
                        <input type="submit" value="Add Workout" className="btn btn-dark" />
                    </div>
                </form>
                </div>
                </section>
                </div>
        )
    }

}
