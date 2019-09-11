import React, {Component} from 'react';
import { Link } from "react-router-dom";

export default class AnalyzePage extends Component {
    render(){
        return(
            <div className='container-fluid' style={{backgroundColor: 'black', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%', minHeight: 'fit-content'}} >
              <section className='inner row justify-content-center align-items-center text-center' style={{height: '100%'}}>
                <div className='col align-items-end'>
                    <div className="card-deck">
                        <div className="card" style={{backgroundColor: 'black'}}>
                            <div className="card-body">
                                <h3 className="card-title text-white">Lifts</h3>
                                    <p className="card-text text-white">Input your current PRs and see how they've changed over time.</p>
                                    <Link to="/features/analyze/lifts" className="btn btn-dark text-white" style={{margin: '5px'}}>Analyze</Link>
                            </div>
                        </div>
                        <div className="card" style={{backgroundColor: 'black'}}>
                            <div className="card-body">
                                    <h3 className="card-title text-white">Nutrition</h3>
                                    <p className="card-text text-white">Input your bodyweight and macro consumption and see how they've changed over time.</p>
                                    <Link to="/features/analyze/nutrition" className="btn btn-dark text-white" style={{margin: '5px'}}>Analyze</Link>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
          </div>
        );
    }

}