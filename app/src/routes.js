import React from 'react'
import { Route, IndexRedirect } from 'react-router'

import App from './containers/App'
import Admin from './components/Admin'
import Login from './components/Login'
import Dashboard from './containers/Dashboard'
import AuthService from './utils/AuthService'

const auth = new AuthService('bgALOaDiY3uU1LX9kT31ISFkAxrQOc8j', 'rakan.auth0.com');

const requireAuth = (nextState, replace) => {
	//clear store

	//redirect them to login page
	if(!auth.loggedIn()) {
		replace({ pathname: '/login'})
	}
}
//	<IndexRoute component={Login} />
export default(
	<Route path="/" component={App} auth={auth}>
		<IndexRedirect to="/dashboard" />
		<Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
		<Route path="admin" component={Admin} />
		<Route path="login" component={Login} />
	</Route>
)
