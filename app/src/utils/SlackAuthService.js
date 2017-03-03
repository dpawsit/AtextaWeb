import Auth0Lock from 'auth0-lock';
import cred from '../../../keys';
let slackLock = new Auth0Lock(cred.slackAuthClient, cred.domain)

slackLock.on("authenticated", function(authResult) {
	_doAuthentication(authResult);
});

let _doAuthentication = function(authResult) {
  slackLock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      console.log('error in getting slack user info :', error);
      return;
    }
		setToken(JSON.stringify(profile.accessToken));
  });
};

slackLock.getToken = function() {
	return JSON.parse(localStorage.getItem("slackToken"));
}

let setToken = (slackToken) => {
	localStorage.setItem("slackToken", slackToken);
};

export default slackLock;