import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { authStateReducer } from "redux-auth";

import apartments from './apartments';
import initialSearch from './initialSearch';
import googleMap from './googleMap';

const reducers = combineReducers({
  auth: authStateReducer,
  routing,
  apartments,
  googleMap,
  initialSearch
});

export default reducers;
