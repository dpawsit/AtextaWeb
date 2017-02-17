import { combineReducers } from 'redux';
import MessagesReducer from './reducer_messages'
import PeopleReducer from './reducer_people'
import GroupsReducer from './reducer_groups'

const rootReducer = combineReducers({
	messages: MessagesReducer,
	people: PeopleReducer,
	groups: GroupsReducer
});

export default rootReducer;