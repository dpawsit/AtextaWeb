import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import axios from 'axios'
import items from '../../keys'
import App from './containers/App'
import Admin from './components/Admin'
import Login from './components/Login'
import Dashboard from './containers/Dashboard'
import AuthService from './utils/AuthService'

const auth = new AuthService(items.client, items.domain);

const requireAuth = (nextState, replace) => {

	if(!auth.loggedIn()) {
		replace({ pathname: '/login'})
	} 
}

export default (
	<Route path="/" component={App} auth={auth}>
		<IndexRedirect to="/dashboard" />
		<Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
		<Route path="admin" component={Admin} />
		<Route path="login" component={Login} />
	</Route>
)

