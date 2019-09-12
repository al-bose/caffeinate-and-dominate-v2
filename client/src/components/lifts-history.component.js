import React, {Component} from 'react';
import axios from 'axios';


export default class LiftHistory extends Component {
    constructor(props){
        super(props);
        this.state = {
            lifts:[]
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.liftList = this.liftList.bind(this);
    };

    componentDidMount(){
        axios.get('http://caffeinate-and-dominate.herokuapp.com/lifts/')
            .then(response => {
                this.setState({ lifts: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }


    handleDelete(e,id){
        e.preventDefault();
        axios.delete('http://caffeinate-and-dominate.herokuapp.com/lifts/delete/'+id)
            .then(res => {console.log(res)})

        var new_lifts= this.state.lifts.filter(function(lift){
            return lift._id !== id;
        })

        this.setState({lifts:new_lifts});
    }

    liftList(){
        this.state.lifts.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
        })

        return this.state.lifts.map(function(currentLift, i){
            return (
                <tr>
                <td >{currentLift.date}</td>
                <td >{currentLift.bench_press}</td>
                <td >{currentLift.squat}</td>
                <td>
                    {currentLift.deadlift}
                </td>
                <td>
                <button onClick = {e => this.handleDelete(e,currentLift._id)} className="btn btn-dark text-white" style={{margin: '5px', backgroundColor: 'black'}}>-
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
                        <th>Bench Press</th>
                        <th>Squat</th>
                        <th>Deadlift</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {this.liftList()}
                </tbody>
            </table>
        </div>);
        
    }
}
