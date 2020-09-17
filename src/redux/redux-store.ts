import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import profileReducer from './profile-reducer';
import messagesReducer from './messages-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reucer';
import authReducer from './auth-reducer';
import newsReducer from './news-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './app-reducer';

const reducers = combineReducers({
	profile: profileReducer,
	messages: messagesReducer,
	sidebar: sidebarReducer,
	usersPage: usersReducer,
	auth: authReducer,
	form: formReducer,
	app: appReducer,
	news: newsReducer
});

type RootReduserType = typeof reducers;
export type AppStateType = ReturnType<RootReduserType>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
// window.store = store;

export default store;