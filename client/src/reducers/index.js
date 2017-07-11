import { combineReducers } from 'redux';

import apartments from './apartments';
import googleMap from './googleMap';

const reducers = combineReducers({
  apartments,
  googleMap
});

export default reducers;
