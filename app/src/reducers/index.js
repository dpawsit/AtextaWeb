import { combineReducers } from 'redux';
import MessagesReducer from './reducer_messages'
import PeopleReducer from './reducer_people'
import GroupsReducer from './reducer_groups'
import UserId from './reducer_userId'

const rootReducer = combineReducers({
	messages: MessagesReducer,
	people: PeopleReducer,
	groups: GroupsReducer,
	userId: UserId
});

export default rootReducer;