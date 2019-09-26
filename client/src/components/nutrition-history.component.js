import React, {Component} from 'react';
import axios from 'axios';


export default class NutritionHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            nutrition:[]
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.nutritionList = this.nutritionList.bind(this);
    };

    componentDidMount(){
        axios.get('//caffeinate-and-dominate.herokuapp.com/nutrition/')
            .then(response => {
                this.setState({ nutrition: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }


    handleDelete(e,id){
        e.preventDefault();
        axios.delete('//caffeinate-and-dominate.herokuapp.com/nutrition/delete/'+id)
            .then(res => {console.log(res)})

        var new_nutrition= this.state.nutrition.filter(function(current){
            return current._id !== id;
        })

        this.setState({nutrition:new_nutrition});
    }

    nutritionList(){

        this.state.nutrition.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
        })

        return this.state.nutrition.map(function(currentNutrition, i){
            return (
                <tr>
                <td >{currentNutrition.date}</td>
                <td >{currentNutrition.calories}</td>
                <td >{currentNutrition.carbs}</td>
                <td >{currentNutrition.fats}</td>
                <td >{currentNutrition.protein}</td>
                <td >{currentNutrition.bodyweight}</td>
                <td>
                <button onClick = {e => this.handleDelete(e,currentNutrition._id)} className="btn btn-dark text-white" style={{margin: '5px', backgroundColor: 'black'}}>-
                </button>
                </td>
            </tr>
            );
        }, this)
    }

    render(){

        return(<div className='container-fluid' style={{backgroundColor: 'black', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 'fit-content', minHeight: '100%'}}>
            <table className="table text-white" style={{backgroundColor: 'black'}} >
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Calories</th>
                        <th>Carbs</th>
                        <th>Fats</th>
                        <th>Protein</th>
                        <th>Body Weight</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.nutritionList()}
                </tbody>
            </table>
        </div>);
        
    }
}
