import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import { Panel, Navbar, Button, ControlLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './stylesheets/main.css';
import routes from './routes';
import configureStore from './redux/configureStore';

// FIREBASE LISTENERS / ACTIONS
import { startListeningToAuthChanges } from './redux/actions/firebaseAuth';
import { startListeningForCampaigns } from './redux/actions/firebaseCampaigns';

bootstrapUtils.addStyle(Panel, 'remove-default');
bootstrapUtils.addStyle(Navbar, 'remove-default');
bootstrapUtils.addStyle(ControlLabel, 'remove-default');
bootstrapUtils.addStyle(Button, ...['remove-default', 'as-link']);

const store = configureStore();
const persistor = persistStore(store);

store.dispatch(startListeningToAuthChanges());
store.dispatch(startListeningForCampaigns());

// eslint-disable-next-line
export const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={history} routes={routes} />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
