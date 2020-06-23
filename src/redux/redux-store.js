import {createStore, combineReducers} from 'redux';
import profileReducer from './profile-reducer';
import messagesReducer from './messages-reducer';
import sidebarReducer from './sidebar-reducer';

const reducers = combineReducers({
	profile: profileReducer,
	messages: messagesReducer,
	sidebar: sidebarReducer
});

let store = createStore(reducers);

export default store;