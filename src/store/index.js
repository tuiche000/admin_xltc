import {createStore, combineReducers} from 'redux';
import admin from './admin';
import g from './g';

export default createStore(combineReducers({
  admin, g
}), (process.env.NODE_ENV === 'development') && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
