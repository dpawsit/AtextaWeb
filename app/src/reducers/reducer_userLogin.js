import { USER_LOGIN } from '../actions/index';

const INITIAL_STATE = {
  token: null,
  userId: null
}
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_LOGIN:
    return [ action.payload.data, ...state ];
  }
  return state;
}