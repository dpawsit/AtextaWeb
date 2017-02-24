import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'

export default class AuthService{
	constructor(clientId, domain) {
		this.lock = new Auth0Lock(clientId, domain, {
			auth: {
				redirectUrl: 'http://ec2-52-32-158-134.us-west-2.compute.amazonaws.com/',
				responseType: 'token'
			}
		})
		this.lock.on('authenticated', this._doAuthentication.bind(this))
		this.login = this.login.bind(this)
	}

	_doAuthentication(authResult) {
		this.setToken(authResult.idToken)
		this.setAccesstoken(authResult.accessToken)
		browserHistory.replace('/dashboard');

	}

	login() {
		this.lock.show()
	}

	loggedIn() {
		return !!this.getToken()
	}

	setToken(idToken) {
		localStorage.setItem('idToken', idToken)
	}

	getToken() {
		return localStorage.getItem('idToken')
	}

	setAccesstoken(accessToken) {
		localStorage.setItem('accessToken', accessToken)
	}

	getAccessToken() {
		return localStorage.getItem('accessToken')
	}

	logout() {
		localStorage.removeItem('idToken');
		localStorage.removeItem('accessToken');
		browserHistory.replace('/login');
	}

	getProfile(token) {
		return new Promise((resolve, reject)=>{
			this.lock.getUserInfo(token, function(err, profile) {
				if(err) {
					reject(err)
				} else {
					resolve(profile)
				}
			})
		})
	}

}