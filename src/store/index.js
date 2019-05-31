import {createStore, combineReducers} from 'redux';
import admin from './admin';
import g from './g';

export default createStore(combineReducers({
  admin, g
}));
