import React, {Component} from 'react';
import { Link } from "react-router-dom";

import dumbbells from './dumbbells.png'
import food from './food.png'
import analyze from './analyze.png'

export default class FeaturesPage extends Component {

    render(){
        return(
        <div className='container-fluid inner row justify-content-center align-items-center text-center' style={{backgroundColor: 'black', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100%', margin: '0'}}>
        <div className="card-deck ">
            <div className="card" style={{backgroundColor: 'black'}}>
                <img src={dumbbells} className="card-img-top" alt=""/>
                <div className="card-body">
                    <h5 className="card-title text-white">WORKOUT</h5>
                    <p className="card-text text-white">View, add and edit workouts to have them at your fingertips so you never forget the next set.</p>
                    <Link to="/features/workout" className="btn btn-dark">View Workouts</Link>
                </div>
            </div>
            <div className="card" style={{backgroundColor: 'black'}}>
                <img src={food} className="card-img-top" alt=""/>
                <div className="card-body">
                    <h5 className="card-title text-white">EAT</h5>
                    <p className="card-text text-white">Track your macros with an inbuilt calculator so you are never missing out on those all important nutrients.</p>
                    <Link to="/features/eat" className="btn btn-dark">Track Macros</Link>
                </div>
            </div>
            <div className="card" style={{backgroundColor: 'black'}}>
                <img src={analyze} className="card-img-top" alt=""/>
                <div className="card-body">
                    <h5 className="card-title text-white">ANALYZE</h5>
                    <p className="card-text text-white">View your daily macro and weight progress to help you keep on track and stay motivated.</p>
                    <Link to="/features/analyze" className="btn btn-dark">Analyze Data</Link>
                </div>
            </div>

        </div>
        </div>
        );
    }

};