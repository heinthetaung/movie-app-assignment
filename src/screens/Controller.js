import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../screens/home/Home'
import Details from '../screens/details/Details'
import Bookshow from '../screens/bookshow/BookShow'
import Confirmation from '../screens/confirmation/Confirmation'

let Controller = () => {

    let baseUrl = '/api/v1/'

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <Home baseUrl={baseUrl} />
                    </Route>
                    <Route path='/movies/:movie_id'>
                        <Details baseUrl={baseUrl} />
                    </Route>
                    <Route
                        path='/bookshow/:id'
                        render={ (props) =>
                            <Bookshow {...props} baseUrl={baseUrl} />
                        }
                    >
                    </Route>
                    <Route
                        path='/confirmation/:id'
                        render={(props) =>
                            <Confirmation {...props} baseUrl={baseUrl} />
                        }
                    >
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Controller