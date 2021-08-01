import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../screens/home/Home'
import Details from '../screens/details/Details'

let Controller = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route path='/movies/:movie_id'>
                        <Details />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Controller