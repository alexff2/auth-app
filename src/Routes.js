import React from 'react'
import {Router, Switch, Route, Redirect} from 'react-router'

import {history} from './history'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import notFound from './pages/notFound'

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route component={Login} path="/login"/>
      <Route component={Register} path="/register"/>
      <PrivateRoute component={Home} exact path="/"/>
      <PrivateRoute component={notFound}/>
    </Switch>
  </Router>
)

const PrivateRoute = props => {
  return localStorage.getItem('koa-token')? <Route {... props} /> : <Redirect to="/login" />
}

export default Routes