import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import initialSearch from './initialSearch';
import googleMap from './googleMap';
import activeCampaign from './activeCampaign';
import newCampaign from './newCampaign';
import signature from './signature';
import comments from './comments';
// FIREBASE
import firebaseAuth from './firebaseAuth';
import firebaseWasteProviders from './firebaseWasteProvier';
import wasteProvider from './wasteProvider';

const reducers = combineReducers({
  auth: firebaseAuth,
  routing,
  googleMap,
  newCampaign,
  initialSearch,
  activeCampaign,
  comments,
  signature,
  firebaseWasteProviders,
  wasteProvider
});

export default reducers;
