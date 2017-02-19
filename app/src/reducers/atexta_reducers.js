import { USER_LOGIN, GET_COMMANDS, GET_GROUPS } from '../actions/atexta_actions';

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
      // console.log('getting comands in atexta reducer payload:', action.payload)
      return {...state, userCommands: action.payload.data || []}

    case GET_GROUPS:
      console.log('fetching your groups the payload is', action.payload)
      return{...state, userGroups: action.payload.data || []}

    default: return state;
  }
}