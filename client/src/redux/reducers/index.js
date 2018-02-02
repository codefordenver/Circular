import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import authReducer from './authReducer';
import initialSearch from './initialSearch';
import googleMap from './googleMap';
import activeCampaign from './activeCampaign';
import newCampaign from './newCampaign';
import signature from './signature';
import comments from './comments';

const reducers = combineReducers({
  auth: authReducer,
  routing,
  googleMap,
  newCampaign,
  initialSearch,
  activeCampaign,
  comments,
  signature
});

export default reducers;
