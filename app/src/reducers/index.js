import { combineReducers } from 'redux';
import AtextaReducer from './atexta_reducers'

const rootReducer = combineReducers({
	Atexta: AtextaReducer
});

export default rootReducer;