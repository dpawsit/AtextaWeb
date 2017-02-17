import axios from 'axios';

export const USER_LOGIN = 'USER_LOGIN';

export function getUserId(profile, token) {
  //console.log('got this profile in action handler getr user id', profile)
  let request = axios.post('/auth/login', {profile})
  console.log('request from action', request);
  return {
    type: USER_LOGIN,
    payload: token
  };
}