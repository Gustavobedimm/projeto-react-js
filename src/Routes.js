import React from 'react';
import  { Switch,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return(
        <Switch>
            <Route exact path="/"> 
                <Home/>
            </Route>
            <Route exact path="/Logout"> 
                <Login/>
            </Route>
        </Switch>
    );
}