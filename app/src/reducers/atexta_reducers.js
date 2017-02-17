import { USER_LOGIN } from '../actions/index';

const INITIAL_STATE = {
  token: null,
  userId: null
}

export default function(state = INITIAL_STATE, action) {
  console.log('what the fuck is our action', action.type)
  switch (action.type) {

    case USER_LOGIN:
      console.log('in user login atexta reducer payload:', action.payload)
      return {...state, userId: action.payload}

    default: return state;
  }
}