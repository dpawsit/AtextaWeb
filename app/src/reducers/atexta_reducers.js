import { USER_LOGIN, ADD_COMMAND, ADD_GROUP, USER_LOGOUT, EDIT_COMMAND} from '../actions/atexta_actions';

const INITIAL_STATE = {
  userId : '',
  userCommands: [],
  userGroups: []
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {

    case USER_LOGIN:
      return {...state, userId: action.payload.userId, userCommands: action.payload.userCommands, userGroups: action.payload.userGroups, userRecipients: action.payload.userRecipients}
    
    case ADD_COMMAND:
      return{...state, userCommands: state.userCommands.concat(action.payload)}
    
    case EDIT_COMMAND:
      const commands = state.userCommands
      const index = commands.findIndex(command => command.id === action.payload.id)
      commands[index] = action.payload.editCommand

      return{...state, userCommands: commands}

    case ADD_GROUP:
      return{...state, userGroups: state.userGroups.concat(action.payload)}

    // case GET_COMMANDS: 
    //   return {...state, userCommands: action.payload.data || []}

    // case GET_GROUPS:
    //   return{...state, userGroups: action.payload.data || []}
    case USER_LOGOUT:
      return INITIAL_STATE

    default: return state;
  }
}