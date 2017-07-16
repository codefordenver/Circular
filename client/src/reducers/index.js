import { combineReducers } from 'redux';

import apartments from './apartments';
import apartmentMatches from './apartmentMatches';
import googleMap from './googleMap';

const reducers = combineReducers({
  apartments,
  googleMap,
  apartmentMatches
});

export default reducers;
