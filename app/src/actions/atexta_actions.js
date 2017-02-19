import axios from 'axios';

export const USER_LOGIN = 'USER_LOGIN';
export const GET_COMMANDS = 'GET_COMMANDS'

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

export function getUserCommands(userId) {
  console.log('inside get user commands with id:' + userId)
  let request = axios.get('/command/userCommands/'+userId)
  return {
    type: GET_COMMANDS,
    payload: request
  }
}