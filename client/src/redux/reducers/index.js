import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
// import initialSearch from './initialSearch';
import googleMap from './googleMap';
// import activeCampaign from './activeCampaign';
import newCampaign from './newCampaign';
import signature from './signature';
import comments from './comments';
// FIREBASE
import firebaseAuth from './firebaseAuth';
import firebaseWasteProviders from './firebaseWasteProviders';
import wasteProvider from './wasteProvider';
import firebaseSignaturesReducer from './firebaseSignatures';
import firebaseCampaigns from './firebaseCampaigns';
import firebaseInitialSearch from './firebaseInitialSearch';
import firebaseActiveCampaign from './firebaseActiveCampaign';

const reducers = combineReducers({
  auth: firebaseAuth,
  routing,
  googleMap,
  newCampaign,
  firebaseInitialSearch,
  activeCampaign: firebaseActiveCampaign,
  comments,
  signature,
  firebaseWasteProviders,
  firebaseSignatures: firebaseSignaturesReducer,
  firebaseCampaigns,
  wasteProvider
});

export default reducers;
