import { GET_USER_ID } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
  case GET_USER_ID:
    return [ action.payload.data, ...state ];
  }
  return state;
}