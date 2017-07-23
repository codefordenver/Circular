import { combineReducers } from 'redux';

import apartments from './apartments';
import initialSearch from './initialSearch';
import googleMap from './googleMap';

const reducers = combineReducers({
  apartments,
  googleMap,
  initialSearch
});

export default reducers;
