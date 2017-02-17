import Auth0Lock from 'auth0-lock'

export default class AuthService{
	constructor(clientId, domain) {
		this.lock = new Auth0Lock(clientId, domain, {
			auth: {
				redirectUrl: 'http://localhost:3000/',
				responseType: 'token'
			}
		})
		this.lock.on('authenticated', this._doAuthentication.bind(this))
		this.login = this.login.bind(this)
	}

	_doAuthentication(authResult) {
		this.setToken(authResult.idToken)
		this.lock.getUserInfo(authResult.accessToken, function(err, profile) {
			if(err) {
				console.log('could not get profile', err)
			} else {
				localStorage.setItem('accessToken', authResult.accessToken)
				localStorage.setItem('profile', JSON.stringify(profile));
			}

		})
		// this.props.handleLogin(authResult.idToken)

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

	logout() {
		localStorage.removeItem('accessToken')
	}

	getProfile() {
		return localStorage.getItem('profile')
	}

}