import { combineReducers } from 'redux';
import AtextaReducer from './atexta_reducers'

const rootReducer = combineReducers({
	atexta : AtextaReducer
});

export default rootReducer;
