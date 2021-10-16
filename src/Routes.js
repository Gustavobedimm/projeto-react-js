import React from 'react';
import  { Switch,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return(
        <Switch>
            <Route exact path="/"> 
                <Dashboard/>            
            </Route>
            <Route exact path="/Logout"> 
                <Login/>
            </Route>
        </Switch>
    );
}
//<Home/>