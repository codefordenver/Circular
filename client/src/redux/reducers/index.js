import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { authStateReducer } from 'redux-auth';

import initialSearch from './initialSearch';
import googleMap from './googleMap';
import activeCampaign from './activeCampaign';
import signature from './signature';

const reducers = combineReducers({
  auth: authStateReducer,
  routing,
  googleMap,
  initialSearch,
  activeCampaign,
  signature
});

export default reducers;
