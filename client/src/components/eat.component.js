import React, {Component} from 'react';
import axios from 'axios';

export default class EatPage extends Component {


    constructor(props){
        super(props);
        this.state = {
            total_calories : 0,
            total_fats: 0,
            total_carbs: 0,
            total_protein: 0,
            meals: [],
            current_name: '',
            current_calories: 0,
            current_fats: 0,
            current_carbs: 0,
            current_protein: 0
        }

        this.handleReset = this.handleReset.bind(this);
        this.onChangeMealName = this.onChangeMealName.bind(this);
        this.onChangeMealCalories = this.onChangeMealCalories.bind(this);
        this.onChangeMealFats = this.onChangeMealFats.bind(this);
        this.onChangeMealCarbs = this.onChangeMealCarbs.bind(this);
        this.onChangeMealProtein = this.onChangeMealProtein.bind(this);
        this.saveMeal = this.saveMeal.bind(this);
        this.loadMeals = this.loadMeals.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://caffeinate-and-dominate.herokuapp.com/meals/')
        .then(response => {
            this.setState({ meals: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
    }


    handleReset(){
        this.setState(
            {
                total_calories : 0,
                total_fats: 0,
                total_carbs: 0,
                total_protein: 0
            }
        )
    }

    onChangeMealName(e){
        this.setState(
            {current_name: e.target.value}
        )
    }

    onChangeMealCalories(e){
        this.setState({current_calories: e.target.value})
    }

    onChangeMealFats(e){
        this.setState({current_fats: e.target.value})
    }

    onChangeMealCarbs(e){
        this.setState({current_carbs: e.target.value})
    }

    onChangeMealProtein(e){
        this.setState({current_protein: e.target.value})
    }

    handleDelete(e,id){
        e.preventDefault();
        axios.delete('http://caffeinate-and-dominate.herokuapp.com/meals/delete/'+id)
            .then(res => {console.log(res)})

            var new_meals= this.state.meals.filter(function(meal){
                return meal._id !== id;
            })
    
            this.setState({meals:new_meals});
    }

    handleChoice(e,meal){
        this.setState({
            current_name: meal.meal_name,
            current_calories: meal.meal_calories,
            current_fats: meal.meal_fats,
            current_carbs: meal.meal_carbs,
            current_protein: meal.meal_protein
        })
    }

    mealList(){
        
        return this.state.meals.map(function(currentMeal,i){
            return(
                <div>
                    <button onClick = {e => this.handleChoice(e,currentMeal)} className="btn btn-dark text-white" style={{margin: '5px', backgroundColor: 'black'}}>{currentMeal.meal_name} ({currentMeal.meal_calories} Kcal)</button>
                    <button onClick = {e => this.handleDelete(e,currentMeal._id)} className="btn btn-dark text-white" style={{margin: '5px', backgroundColor: 'black'}}>-</button>
                </div>
            );
        }, this)
    }

    loadMeals(e){
        e.preventDefault();
        console.log('here')

        axios.get('http://caffeinate-and-dominate.herokuapp.com/meals/')
        .then(response => {
            this.setState({ meals: response.data });
        })
        .catch(function (error){
            console.log(error);
        })

    }

    saveMeal(e){
        e.preventDefault();

        const newMeal = {
            meal_name: this.state.current_name,
            meal_calories: this.state.current_calories,
            meal_carbs: this.state.current_carbs,
            meal_fats: this.state.current_fats,
            meal_protein: this.state.current_protein
        };

        axios.post('http://caffeinate-and-dominate.herokuapp.com/meals/add', newMeal)
            .then(res => console.log(res.data));

        axios.get('http://caffeinate-and-dominate.herokuapp.com/meals/')
            .then(response => {
                this.setState({ meals: response.data });
            })
            .catch(function (error){
                console.log(error);
            })


        this.setState({
            total_calories: this.state.total_calories + parseInt(this.state.current_calories,10),
            total_carbs: this.state.total_carbs + parseInt(this.state.current_carbs,10),
            total_fats: this.state.total_fats + parseInt(this.state.current_fats,10),
            total_protein: this.state.total_protein + parseInt(this.state.current_protein,10),
            current_name: '',
            current_calories: 0,
            current_fats: 0,
            current_carbs: 0,
            current_protein: 0
         })


    }

    onSubmit(e){
        e.preventDefault();


        this.setState({
           total_calories: this.state.total_calories + parseInt(this.state.current_calories,10),
           total_carbs: this.state.total_carbs + parseInt(this.state.current_carbs,10),
           total_fats: this.state.total_fats + parseInt(this.state.current_fats,10),
           total_protein: this.state.total_protein + parseInt(this.state.current_protein,10),
           current_name: '',
           current_calories: 0,
           current_fats: 0,
           current_carbs: 0,
           current_protein: 0
        })
    }

    render(){
        return(
            <div className='container-fluid' style={{backgroundColor: 'black', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%', minHeight: '100%'}}>
                <section className='inner row justify-content-center align-items-center text-center' style={{height: '100%'}}>
                    <div className='col align-items-end'>
                        <div className="card text-white justify-content-center align-items-center text-center inner row justify-content-center align-items-center text-center" style ={{backgroundColor: 'black'}}>
                            <div className='card-title'>
                                <h2>Macro Tracker</h2>
                            </div>
                            <div className="card-body">
                                <p><span className='font-weight-bold'>Calories: </span> {this.state.total_calories} kCal</p>
                                <p><span className='font-weight-bold'>Fats: </span>{this.state.total_fats} g</p>
                                <p><span className='font-weight-bold'>Carbs: </span>{this.state.total_carbs} g</p>
                                <p><span className='font-weight-bold'>Protein: </span>{this.state.total_protein} g</p>
                            </div>
                        </div>
                        <button className='btn btn-dark' onClick={this.handleReset}>Reset</button>
                        <button data-toggle="modal" data-target="#addmeal" className='btn btn-dark' style={{margin: '5px'}}>Add Meal</button>
                    </div>
                </section>


                <div className="modal fade text-white" style = {{backgroundColor : 'black'}} id="addmeal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" style = {{backgroundColor : 'black'}} role="document">
                        <div className="modal-content" style = {{backgroundColor : 'black'}}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Enter a New Meal or Choose a Saved One</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className='text-white'>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group  justify-content-center align-items-center text-center">
                                        <div className="dropdown">
                                            <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={e=>this.loadMeals(e)}>
                                            Saved Meals
                                            </button>
                                            <div className="dropdown-menu" style={{width: 'max-content', backgroundColor: 'black'}} aria-labelledby="dropdownMenuButton">
                                                {this.mealList()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row text-white"> 
                                    <label className = "col-sm-2 col-form-label font-weight-bold"> Name: </label>
                                        <div className='col-sm-5'>
                                            <input type="text"
                                            className="form-control"
                                            value={this.state.current_name}
                                            onChange={this.onChangeMealName} />
                                        </div>
                                    </div>
                                    <div className="form-group row text-white"> 
                                    <label className = "col-sm-2 col-form-label font-weight-bold"> Calories: </label>
                                        <div className='col-sm-5'>
                                            <input type="text"
                                            className="form-control"
                                            value={this.state.current_calories}
                                            onChange={this.onChangeMealCalories} />
                                        </div>
                                    </div>
                                    <div className="form-group row text-white"> 
                                    <label className = "col-sm-2 col-form-label font-weight-bold"> Fats: </label>
                                        <div className='col-sm-5'>
                                            <input type="text"
                                            className="form-control"
                                            value={this.state.current_fats}
                                            onChange={this.onChangeMealFats} />
                                        </div>
                                    </div>

                                    <div className="form-group row text-white"> 
                                    <label className = "col-sm-2 col-form-label font-weight-bold"> Carbs: </label>
                                        <div className='col-sm-5'>
                                            <input type="text"
                                            className="form-control"
                                            value={this.state.current_carbs}
                                            onChange={this.onChangeMealCarbs} />
                                        </div>
                                    </div>

                                    <div className="form-group row text-white"> 
                                    <label className = "col-sm-2 col-form-label font-weight-bold"> Protein: </label>
                                        <div className='col-sm-5'>
                                            <input type="text"
                                            className="form-control"
                                            value={this.state.current_protein}
                                            onChange={this.onChangeMealProtein} />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group  justify-content-center align-items-center text-center">
                                        <input type="submit" value="Add Meal" className="btn btn-dark" />
                                        <button className='btn btn-dark' style={{margin: '5px'}} onClick={e=>this.saveMeal(e)}>Save</button>
                                    </div>
                                </form>                                

                            </div>
                     </div>
                </div>
                </div>
            </div>
        );
    }
}
