import { USER_LOGIN } from '../actions/atexta_actions';

const INITIAL_STATE = {
  userId : ''
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {

    case 'USER_LOGIN':
      console.log('in user login atexta reducer payload:', action.payload)
      return {userId: action.payload.data}

    default: return state;
  }
}