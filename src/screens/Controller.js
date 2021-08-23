import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../screens/home/Home'
import Details from '../screens/details/Details'

let Controller = () => {

    let baseUrl = '/api/v1/'

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <Home baseUrl={baseUrl}/>
                    </Route>
                    <Route path='/movies/:movie_id'>
                        <Details baseUrl={baseUrl}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Controller