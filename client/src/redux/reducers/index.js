import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import authReducer from './authReducer';
import initialSearch from './initialSearch';
import googleMap from './googleMap';
import activeCampaign from './activeCampaign';
import signature from './signature';

const reducers = combineReducers({
  auth: authReducer,
  routing,
  googleMap,
  initialSearch,
  activeCampaign,
  signature
});

export default reducers;
