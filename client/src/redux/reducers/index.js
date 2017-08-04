import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import apartments from './apartments';
import initialSearch from './initialSearch';
import googleMap from './googleMap';
import activeCampaign from './activeCampaign';

const reducers = combineReducers({
  routing,
  apartments,
  googleMap,
  initialSearch,
  activeCampaign
});

export default reducers;
