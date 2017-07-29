import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import apartments from './apartments';
import initialSearch from './initialSearch';
import googleMap from './googleMap';

const reducers = combineReducers({
  routing,
  apartments,
  googleMap,
  initialSearch
});

export default reducers;
