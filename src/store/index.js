import {createStore, combineReducers} from 'redux';
import admin from './admin';

export default createStore(combineReducers({
  admin
}));
