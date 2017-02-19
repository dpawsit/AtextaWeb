import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'
export default class AuthService{
	constructor(clientId, domain) {
		this.lock = new Auth0Lock(clientId, domain, {
			auth: {
				redirectUrl: 'http://localhost:3000/login',
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
		localStorage.setItem('id_token', idToken)
	}

	getToken() {
		return localStorage.getItem('id_token')
	}

	setAccesstoken(accessToken) {
		localStorage.setItem('accessToken', accessToken)
	}

	getAccessToken() {
		return localStorage.getItem('accessToken')
	}

	logout() {
		localStorage.removeItem('id_token')
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