import axios from 'axios';
export const USER_LOGIN = 'USER_LOGIN';
export const ADD_COMMAND = 'ADD_COMMAND'
export const ADD_GROUP = 'ADD_GROUP';
export const USER_LOGOUT = 'USER_LOGOUT';
export const EDIT_COMMAND = 'EDIT_COMMAND'
export const EDIT_GROUP = 'EDIT_GROUP'
export const ADD_CONTACT = 'ADD_CONTACT'
export const DELETE_COMMAND = 'DELETE_COMMAND'
export const DELETE_GROUP = 'DELETE_GROUP'
export const EDIT_CONTACT = 'EDIT_CONTACT'
export const DELETE_CONTACT = 'DELETE_CONTACT'

export function getUserInfo (userId, userCommands, userGroups, userRecipients) {
  return {
    type: USER_LOGIN,
    payload: { userId, userCommands, userGroups, userRecipients}
  };
}

export function addCommand (newCommand) {
  return {
    type: ADD_COMMAND,
    payload: newCommand
  }
}

export function editCommand (editCommand, id) {
  return {
    type: EDIT_COMMAND,
    payload: { editCommand, id }
  }
}

export function addGroup (newGroup) {
  return {
    type: ADD_GROUP,
    payload: newGroup
  }
}

export function userLogout () {
  return {
    type : USER_LOGOUT,
    payload : null
  }
}

export function addContact(newContact) {
  return {
    type: ADD_CONTACT,
    payload: newContact
  }
}

export function deleteCommand(command) {
  return {
    type: DELETE_COMMAND,
    payload: command
  }
}

export function deleteGroup(group) {
  return {
    type: DELETE_GROUP,
    payload: group
  }
}

export function editGroup(editedGroup) {
  return{
    type: EDIT_GROUP,
    payload: editedGroup
  }
}

export function editContact(editedContact) {
  return{
    type: EDIT_CONTACT,
    payload: editedContact
  }
}

export function deleteContact(deletedContact) {
  return {
    type: DELETE_CONTACT,
    payload: deletedContact
  }
}