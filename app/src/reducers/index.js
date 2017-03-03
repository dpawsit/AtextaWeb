import { combineReducers } from 'redux';
import AtextaReducer from './atexta_reducers'
import AdminReducer from './admin_reducers'

const rootReducer = combineReducers({
	atexta : AtextaReducer,
	admin : AdminReducer
});

export default rootReducer;
