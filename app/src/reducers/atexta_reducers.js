import { USER_LOGIN, ADD_COMMAND, ADD_GROUP } from '../actions/atexta_actions';

const INITIAL_STATE = {
  userId : '',
  userCommands: [],
  userGroups: []
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {

    case USER_LOGIN:
      return {...state, userId: action.payload.userId, userCommands: action.payload.userCommands, userGroups: action.payload.userGroups}
    
    case ADD_COMMAND:
      return{...state, userCommands: state.userCommands.concat(action.payload)}

    case ADD_GROUP:
      return{...state, userGroups: state.userGroups.concat(action.payload)}
    // case GET_COMMANDS: 
    //   return {...state, userCommands: action.payload.data || []}

    // case GET_GROUPS:
    //   return{...state, userGroups: action.payload.data || []}


    default: return state;
  }
}