import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { authStateReducer } from "redux-auth";

import apartments from './apartments';
import initialSearch from './initialSearch';
import googleMap from './googleMap';
import activeCampaign from './activeCampaign';

const reducers = combineReducers({
  auth: authStateReducer,
  routing,
  apartments,
  googleMap,
  initialSearch,
  activeCampaign
});

export default reducers;
