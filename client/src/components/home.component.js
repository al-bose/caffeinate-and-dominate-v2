import React, {Component} from 'react';

export default class Home extends Component {

    render(){
        return(
            <div className='container-fluid' style={{backgroundColor: 'black', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100%', minHeight: 'fit-content'}} >
              <section className='inner row justify-content-center align-items-center text-center' style={{height: '100%'}}>
                <div className='col align-items-end'>
                  <h1 className="display-5 text-white">Welcome To Caffeinate & Dominate</h1>
                  <p className='lead text-white'>Time to caffeinate up!</p>
                </div>
            </section>
          </div>
        )
    }
}




