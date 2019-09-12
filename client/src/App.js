import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.png';

import LoginPage from "./components/login-page.component";
import Home from './components/home.component';
import FeaturesPage from './components/features.component';
import WorkoutPage from './components/workout.component';
import AddWorkoutPage from './components/add-workout.component';
import EditWorkoutPage from './components/edit-workout-component';
import EatPage from './components/eat.component';
import AnalyzePage from './components/analyze.component';
import AnalyzeLifts from './components/lifts.component';
import LiftHistory from './components/lifts-history.component';
import AnalyzeNutrition from './components/nutrition.component';
import NutritionHistory from './components/nutrition-history.component';


class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'black'}}>
          <div className = 'container-fluid'>
              <a className ="navbar-brand font-weight-bold" href="/" target="_blank">
                <img src={logo} width="50" height="50" alt="" style = {{marginRight: '20px'}}/>
                Caffinate & Dominate
              </a>
              <button type="button" className="navbar-toggle d-lg-none"  style = {{backgroundColor: 'black', borderColor: 'black'}}data-toggle="collapse" data-target="#myNavbar" aria-controls="myNavBar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>                       
              </button>
            <div className="collpase navbar-collapse" id='myNavbar'>
              <ul className="navbar-nav ml-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link font-weight-bold">HOME</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle font-weight-bold" href="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  FEATURES
                  </a>
                  <div className="dropdown-menu dropdown-link-custom" aria-labelledby="navbarDropdownMenuLink" style={{backgroundColor: 'black'}}>
                    <Link to="/features" className="dropdown-item text-white font-weight-bold" >ALL FEATURES</Link>
                    <Link to="/features/workout" className="text-white dropdown-item">WORKOUT</Link>
                    <Link to="/features/eat" className=" text-white dropdown-item">EAT</Link>
                    <Link to="/features/analyze" className="text-white dropdown-item">ANALYZE</Link>
                  </div>
                </li>
                <li className="navbar-item">
                  <Link to="/login" className="nav-link font-weight-bold disabled" >LOGIN</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Route path = '/' exact component={Home} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/features" exact component={FeaturesPage}/>
        <Route path="/features/workout" exact component={WorkoutPage}/>
        <Route path="/features/workout/add" exact component={AddWorkoutPage}/>
        <Route path="/features/workout/edit/:id" exact component={EditWorkoutPage}/>
        <Route path="/features/eat" exact component={EatPage}/>
        <Route path='/features/analyze' exact component={AnalyzePage} />
        <Route path='/features/analyze/lifts' exact component={AnalyzeLifts} />
        <Route path='/features/analyze/lifts/history' exact component={LiftHistory} />
        <Route path='/features/analyze/nutrition' exact component={AnalyzeNutrition} />
        <Route path='/features/analyze/nutrition/history' exact component={NutritionHistory} />
      </Router>
    );
  }
}

export default App;
