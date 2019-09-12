import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory';

export default class Nutrition extends Component {

    constructor(props){
        super(props);
        this.state = {
            calories: 0,
            carbs: 0,
            fats: 0,
            protein: 0,
            bodyweight: 0,
            date: '',
            nutrition: [],
            show_chart: false
        }

        this.onChangeCalories = this.onChangeCalories.bind(this);
        this.onChangeCarbs = this.onChangeCarbs.bind(this);
        this.onChangeFats = this.onChangeFats.bind(this);
        this.onChangeProtein = this.onChangeProtein.bind(this);
        this.onChangeBodyweight = this.onChangeBodyweight.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.displayChart = this.displayChart.bind(this);


    }

    componentDidMount(){
        axios.get('//caffeinate-and-dominate.herokuapp.com/nutrition/')
            .then(response => {
                this.setState({ nutrition: response.data });
            })
            .catch(function (error){
                console.log(error);
            });
    }

    displayChart(e){
        e.preventDefault();
        axios.get('//caffeinate-and-dominate.herokuapp.com/nutrition/')
        .then(response => {
            this.setState({ nutrition: response.data });
        })
        .catch(function (error){
            console.log(error);
        });
        this.setState({
            show_chart: !this.state.show_chart
        });

    }

    onChangeDate(e){
        this.setState({
            date: e.target.value
        })
    }

    onChangeCalories(e){
        this.setState({
            calories : e.target.value
        })
    }

    onChangeCarbs(e){
        this.setState({
            carbs: e.target.value
        })
    }

    onChangeFats(e){
        this.setState({
            fats : e.target.value
        })
    }

    onChangeProtein(e){
        this.setState({
            protein : e.target.value
        })
    }

    onChangeBodyweight(e){
        this.setState({
            bodyweight : e.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();
        
        const newNutrition = {
            calories: this.state.calories,
            carbs: this.state.carbs,
            fats: this.state.fats,
            protein: this.state.protein,
            bodyweight: this.state.bodyweight,
            date: this.state.date
        };

        axios.post('//caffeinate-and-dominate.herokuapp.com/nutrition/add', newNutrition)
            .then(res => console.log(res.data));


        axios.get('//caffeinate-and-dominate.herokuapp.com/nutrition/')
            .then(response => {
                this.setState({ nutrition: response.data });
            })
            .catch(function (error){
                console.log(error);
            })

            this.setState({
                calories: 0,
                carbs: 0,
                fats: 0,
                protein: 0,
                bodyweight: 0,
                date: ''
            });
    }


    render(){

        let filteredData = this.state.nutrition.filter(function(current){
            var currentDate = new Date();
            var oldDate =  new Date(current.date);
            return (currentDate - oldDate)/2592000000 < 1;
        })

        filteredData.sort(function(a,b){
            return new Date(a.date) - new Date(b.date);
        })

        let rendering;
        if(this.state.show_chart)
        {

            rendering = 
            <div className='container-fluid' style={{backgroundColor: 'black', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: 'fit-content', minHeight: '100%'}} >
                <section className='inner row justify-content-center align-items-center text-center' style={{height: '100%'}}>
                    <div className='col align-items-end'>
                    <div className="card-columns">
                        <div className="card" style={{backgroundColor: 'black'}}>
                            <div className="card-body">
                            <h3 className="card-title text-white">Calories</h3>
                            <VictoryChart
                            theme={VictoryTheme.grayscale}
                            style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid white"},
                            labels: {color: 'white'},
                            tickLabels: {
                            fill: 'white'
                            }
                            }}>
                             <VictoryLine
                            style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid white"},
                            labels: {color: 'white'}
                            }}
                            animate={{
                            duration: 500,
                            onLoad: { duration: 500 }
                            }}
                            data = {filteredData}

                            x= "date"
                            y='calories'
                            />
                            </VictoryChart>
                        </div>
                    </div>
                    <div className="card" style={{backgroundColor: 'black'}}>
                            <div className="card-body">
                            <h3 className="card-title text-white">Carbs</h3>
                            <VictoryChart
                            theme={VictoryTheme.grayscale}
                            style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid white"},
                            labels: {color: 'white'},
                            tickLabels: {
                            fill: 'white'
                            }
                            }}>
                             <VictoryLine
                            style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid white"},
                            labels: {color: 'white'}
                            }}
                            animate={{
                            duration: 500,
                            onLoad: { duration: 500 }
                            }}
                                data = {filteredData}

                                x= "date"
                                y='carbs'
                            />
                            </VictoryChart>
                            </div>
                    </div>
                    <div className="card" style={{backgroundColor: 'black'}}>
                            <div className="card-body">
                            <h3 className="card-title text-white">Fats</h3>
                            <VictoryChart
                            theme={VictoryTheme.grayscale}
                            style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid white"},
                            labels: {color: 'white'},
                            tickLabels: {
                            fill: 'white'
                            }
                            }}>
                             <VictoryLine
                            style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid white"},
                            labels: {color: 'white'}
                            }}
                            animate={{
                            duration: 500,
                            onLoad: { duration: 500 }
                            }}
                            data = {filteredData}

                            x= "date"
                            y='fats'
                            />
                            </VictoryChart>
                            </div>
                        </div>
                        <div className="card" style={{backgroundColor: 'black'}}>
                            <div className="card-body">
                            <h3 className="card-title text-white">Protein</h3>
                            <VictoryChart
                            theme={VictoryTheme.grayscale}
                            style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid white"},
                            labels: {color: 'white'},
                            tickLabels: {
                            fill: 'white'
                            }
                            }}>
                             <VictoryLine
                            style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid white"},
                            labels: {color: 'white'}
                            }}
                            animate={{
                            duration: 500,
                            onLoad: { duration: 500 }
                            }}
                            data = {filteredData}

                            x= "date"
                            y='protein'
                            />
                            </VictoryChart>
                            </div>
                        </div>
                        <div className="card" style={{backgroundColor: 'black'}}>
                            <div className="card-body">
                            <h3 className="card-title text-white">Body Weight</h3>
                            <VictoryChart
                            theme={VictoryTheme.grayscale}
                            style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid white"},
                            labels: {color: 'white'},
                            tickLabels: {
                            fill: 'white'
                            }
                            }}>
                             <VictoryLine
                            style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid white"},
                            labels: {color: 'white'}
                            }}
                            animate={{
                            duration: 500,
                            onLoad: { duration: 500 }
                            }}
                            data = {filteredData}

                            x= "date"
                            y='bodyweight'
                            />
                            </VictoryChart>
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        }
        return(
            <div className='container-fluid' style={{backgroundColor: 'black', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'repeat', height: '100%', minHeight: 'fit-content'}} >
            <section className='inner row justify-content-center align-items-center text-center' style={{height: '100%'}}>
              <div className='col align-items-end' style = {{backgroundColor: 'black'}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group row text-white justify-content-center align-items-center text-center"> 
                        <label className = "col-sm-2 col-form-label font-weight-bold"> Calories: </label>
                        <div className='col-sm-2'>
                            <input type="number"
                            className="form-control"
                            value={this.state.calories}
                            onChange={this.onChangeCalories} />
                        </div>
                    </div>
                    <div className="form-group row text-white justify-content-center align-items-center text-center"> 
                        <label className = "col-sm-2 col-form-label font-weight-bold"> Carbs: </label>
                        <div className='col-sm-2'>
                            <input type="number"
                            className="form-control"
                            value={this.state.carbs}
                            onChange={this.onChangeCarbs} />
                        </div>
                    </div>
                    <div className="form-group row text-white justify-content-center align-items-center text-center"> 
                        <label className = "col-sm-2 col-form-label font-weight-bold"> Fats: </label>
                        <div className='col-sm-2'>
                            <input type="number"
                            className="form-control"
                            value={this.state.fats}
                            onChange={this.onChangeFats} />
                        </div>
                    </div> 
                    <div className="form-group row text-white justify-content-center align-items-center text-center"> 
                        <label className = "col-sm-2 col-form-label font-weight-bold"> Protein: </label>
                        <div className='col-sm-2'>
                            <input type="number"
                            className="form-control"
                            value={this.state.protein}
                            onChange={this.onChangeProtein} />
                        </div>
                    </div>
                    <div className="form-group row text-white justify-content-center align-items-center text-center"> 
                        <label className = "col-sm-2 col-form-label font-weight-bold"> Body Weight: </label>
                        <div className='col-sm-2'>
                            <input type="number"
                            className="form-control"
                            value={this.state.bodyweight}
                            onChange={this.onChangeBodyweight} />
                        </div>
                    </div>
                    <div className="form-group row text-white justify-content-center align-items-center text-center"> 
                        <label className = "col-sm-2 col-form-label font-weight-bold"> Date: </label>
                        <div className='col-sm-2'>
                            <input type="text"
                            placeholder = "MM/DD/YYYY"
                            className="form-control"
                            value={this.state.date}
                            onChange={this.onChangeDate} />
                        </div>
                    </div>              
                    <div className="form-group justify-content-center align-items-center text-center">
                        <input type="submit" value="Add" className="btn btn-dark" />
                    </div>
                    <div className="form-group justify-content-center align-items-center text-center">  
                        <button onClick={e => this.displayChart(e)} className = 'btn btn-dark' style={{margin: '5px'}}>View Charts</button>                      
                        <Link to={"/features/analyze/nutrition/history"} className="btn btn-dark" style={{margin: '5px'}}>Edit/View History</Link>
                    </div>
                </form> 
                {rendering}           
              </div>
          </section>
        </div>
        );
    }
}
