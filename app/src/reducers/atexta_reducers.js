import { USER_LOGIN, ADD_COMMAND, ADD_GROUP, USER_LOGOUT, EDIT_COMMAND, 
  ADD_CONTACT, DELETE_COMMAND, DELETE_GROUP, EDIT_GROUP} from '../actions/atexta_actions';

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
      const commands = state.userCommands.slice()
      const index = commands.findIndex(command => command.id === action.payload.id)
      commands[index] = action.payload.editCommand

      return{...state, userCommands: commands}

    case ADD_GROUP:
      console.log('adding group with', action.payload)
      return{...state, userGroups: state.userGroups.concat(action.payload)}

    case USER_LOGOUT:
      return INITIAL_STATE

    case ADD_CONTACT:
      return {...state, userRecipients: state.userRecipients.concat(action.payload)}
    
    case DELETE_COMMAND:
      const prevIndex = state.userCommands.findIndex(command => command.id === action.payload.id)
      const prevCommands = state.userCommands.slice(0, prevIndex).concat(state.userCommands.slice(prevIndex+1))
      return{...state, userCommands: prevCommands}

    case DELETE_GROUP:
      console.log('delete group payload', action.payload, state.userGroups)
      const indexOfGroupToDelete = state.userGroups.findIndex(group=>group.groupId === action.payload.groupId)
      const slicedGroups = state.userGroups.slice(0, indexOfGroupToDelete).concat(state.userGroups.slice(indexOfGroupToDelete+1))
      return{...state, userGroups: slicedGroups}

    case EDIT_GROUP:
      const groups = state.userGroups.slice()
      const indexOfGroupToEdit = state.userGroups.findIndex(group=>group.groupId === action.payload.groupId)
      groups[indexOfGroupToEdit] = action.payload
      return{...state, userGroups: groups}

    default: return state;
  }
}