import axios from 'axios';
export const USER_LOGIN = 'USER_LOGIN';
export const ADD_COMMAND = 'ADD_COMMAND'
// export const GET_COMMANDS = 'GET_COMMANDS'
// export const GET_GROUPS = 'GET_GROUPS'

export function getUserInfo (userId, userCommands, userGroups) {
  return {
    type: USER_LOGIN,
    payload: { userId, userCommands, userGroups}
  };
}

export function addCommand (newCommand) {
  return {
    type: ADD_COMMAND,
    payload: newCommand
  }
}

// export function getUserCommands(userId) {
//   let request = axios.get('/command/userCommands/'+userId)
//   return {
//     type: GET_COMMANDS,
//     payload: request
//   }
// }

// export function getUserGroups(userId) {
//   let request = axios.get('groups/allGroups/'+userId)
//   return{
//     type: GET_GROUPS,
//     payload: request
//   }
// }