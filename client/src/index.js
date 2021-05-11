import React from 'react'
import ReactDOM from 'react-dom'
import './css/index.css'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import {MainPage} from './pages/MainPage'
import {LoginPage} from './pages/LoginPage'
import {RegisterPage} from './pages/RegisterPage'

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/'>
                <MainPage/>
            </Route>
            <Route exact path='/login'>
                <LoginPage/>
            </Route>
            <Route exact path='/register'>
                <RegisterPage/>
            </Route>
        </Switch>
    </Router>, document.getElementById('root'))
