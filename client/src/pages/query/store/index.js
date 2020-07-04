import {applyMiddleware, combineReducers, createStore} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

export default createStore(
	combineReducers(reducers),
	{},
	applyMiddleware(thunk)
)
