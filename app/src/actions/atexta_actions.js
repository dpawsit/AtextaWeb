import axios from 'axios';
export const USER_LOGIN = 'USER_LOGIN';
export const GET_COMMANDS = 'GET_COMMANDS'
export const GET_GROUPS = 'GET_GROUPS'

  //console.log('got this profile in action handler getr user id', profile)
  //l
  //console.log('request from action', request);
export function getUserId (token) {
  let request = axios.post('/auth/login', {token})
  return {
    type: USER_LOGIN,
    payload: request
  };
}

export function getUserCommands(userId) {
  // console.log('inside get user commands with id:' + userId)
  let request = axios.get('/command/userCommands/'+userId)
  return {
    type: GET_COMMANDS,
    payload: request
  }
}

export function getUserGroups(userId) {
  console.log('in getUserGroups with', userId)
  let request = axios.get('groups/allGroups/'+userId)
  return{
    type: GET_GROUPS,
    payload: request
  }
}