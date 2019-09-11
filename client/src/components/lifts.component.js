import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory';

export default class Lifts extends Component {

    constructor(props){
        super(props);

        this.state = {
            bench_press: 0,
            squat: 0,
            deadlift: 0,
            date: '',
            lifts: [],
            show_chart: false
        }

        this.onChangeBenchPress = this.onChangeBenchPress.bind(this);
        this.onChangeDeadlift = this.onChangeDeadlift.bind(this);
        this.onChangeSquat = this.onChangeSquat.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.displayChart = this.displayChart.bind(this);

    }

    componentDidMount(){
        axios.get('http://localhost:4000/lifts/')
            .then(response => {
                this.setState({ lifts: response.data });
            })
            .catch(function (error){
                console.log(error);
            });
    }

    displayChart(e){
        e.preventDefault();
        axios.get('http://localhost:4000/lifts/')
        .then(response => {
            this.setState({ lifts: response.data });
        })
        .catch(function (error){
            console.log(error);
        });

        console.log('here!')
        this.setState({
            show_chart: !this.state.show_chart
        });

    }


    onChangeBenchPress(e){
        this.setState({
            bench_press : e.target.value
        })
    }

    onChangeDate(e){
        this.setState({
            date: e.target.value
        })
    }

    onChangeSquat(e){
        this.setState({
            squat : e.target.value
        })
    }

    onChangeDeadlift(e){
        this.setState({
            deadlift : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        
       

        const newLift = {
            bench_press: this.state.bench_press,
            squat: this.state.squat,
            deadlift: this.state.deadlift,
            date: this.state.date
        };

        axios.post('http://localhost:4000/lifts/add', newLift)
            .then(res => console.log(res.data));

        this.setState({
            bench_press: 0,
            squat: 0,
            deadlift: 0,
            date: '',
            show_chart: !this.state.show_chart
        });

        axios.get('http://localhost:4000/lifts/')
            .then(response => {
                this.setState({ lifts: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }


    render(){

        let filteredData = this.state.lifts.filter(function(lift){
            var currentDate = new Date();
            var oldDate =  new Date(lift.date);
            return (currentDate - oldDate)/2592000000 < 1;
        })

        filteredData.sort(function(a,b){
            return new Date(a.date) - new Date(b.date) ;
        })

        let rendering;
        if(this.state.show_chart)
        {


            
            rendering = 
            <div className='container-fluid' style={{backgroundColor: 'black', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%', minHeight: 'fit-content'}} >
                <section className='inner row justify-content-center align-items-center text-center' style={{height: '100%'}}>
                    <div className='col align-items-end'>
                    <div className="card-columns">
                        <div className="card" style={{backgroundColor: 'black'}}>
                            <div className="card-body">
                            <h3 className="card-title text-white">Bench Press</h3>
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
                            y='bench_press'
                            />
                            </VictoryChart>
                        </div>
                    </div>
                    <div className="card" style={{backgroundColor: 'black'}}>
                            <div className="card-body">
                            <h3 className="card-title text-white">Squat</h3>
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
                                y='squat'
                            />
                            </VictoryChart>
                            </div>
                    </div>
                    <div className="card" style={{backgroundColor: 'black'}}>
                            <div className="card-body">
                            <h3 className="card-title text-white">Deadlift</h3>
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
                            y='deadlift'
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
                        <label className = "col-sm-2 col-form-label font-weight-bold"> Bench Press: </label>
                        <div className='col-sm-2'>
                            <input type="number"
                            className="form-control"
                            value={this.state.bench_press}
                            onChange={this.onChangeBenchPress} />
                        </div>
                    </div>
                    <div className="form-group row text-white justify-content-center align-items-center text-center"> 
                        <label className = "col-sm-2 col-form-label font-weight-bold"> Squat: </label>
                        <div className='col-sm-2'>
                            <input type="number"
                            className="form-control"
                            value={this.state.squat}
                            onChange={this.onChangeSquat} />
                        </div>
                    </div>
                    <div className="form-group row text-white justify-content-center align-items-center text-center"> 
                        <label className = "col-sm-2 col-form-label font-weight-bold"> Deadlift: </label>
                        <div className='col-sm-2'>
                            <input type="number"
                            className="form-control"
                            value={this.state.deadlift}
                            onChange={this.onChangeDeadlift} />
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
                        <Link to={"/features/analyze/lifts/history"} className="btn btn-dark" style={{margin: '5px'}}>Edit/View History</Link>
                    </div>
                </form> 
                {rendering}           
              </div>
          </section>
        </div>
        );
    }
}