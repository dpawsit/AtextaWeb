import { USER_LOGIN, GET_COMMANDS } from '../actions/atexta_actions';

const INITIAL_STATE = {
  userId : '',
  userCommands: []
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {

    case USER_LOGIN:
      console.log('in user login atexta reducer payload:', action.payload)
      return {...state, userId: action.payload.data}
    
    case GET_COMMANDS: 
      console.log('getting comands in atexta reducer payload:', action.payload)
      return {...state, userCommands: action.payload.data || []}

    default: return state;
  }
}