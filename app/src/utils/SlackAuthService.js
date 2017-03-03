import Auth0Lock from 'auth0-lock';
import cred from '../../../keys';
let lock = new Auth0Lock(cred.slackAuthClient, cred.domain, {
	auth: {
		redirect: false
	}
});

lock.on("authenticated", function(authResult) {
	doAuthentication(authResult);
});

let doAuthentication = function(authResult) {
  // lock.getUserInfo(authResult.accessToken, function(error, profile) {
  //   if (error) {
  //     console.log('error in getting slack user info :', error);
  //     return;
  //   }
	setToken(authResult.accessToken);
	getChannels(authResult.accessToken);
  // });
};

lock.checkToken = function() {
	return 
}

let setToken = (slackToken) => {
	localStorage.setItem("slackToken", slackToken);
};

let getChannels = (token) => {
	localStorage.setItem("slackProfile", JSON.stringify(profile));
}

export default lock;