import axios from 'axios';

export const USER_LOGIN = 'USER_LOGIN';

  //console.log('got this profile in action handler getr user id', profile)
  //l
  //console.log('request from action', request);
export function getUserId (profile) {
  console.log('profile from getUseId index.js reducer', profile)
  let request = axios.post('/auth/login', {profile})
  return {
    type: USER_LOGIN,
    payload: request
  };
}