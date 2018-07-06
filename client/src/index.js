import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import { Panel, Navbar, Button, ControlLabel } from 'react-bootstrap';
import routes from './routes';
import './stylesheets/main.css';
import configureStore from './redux/configureStore';
import { saveState } from './redux/localStorage';

// firebase actions
import { startListeningToAuthChanges } from './redux/actions/firebaseAuth';
import { startListeningForSignatures } from './redux/actions/firebaseSignatures';
import { startListeningForCampaigns } from './redux/actions/firebaseCampaigns';

bootstrapUtils.addStyle(Panel, 'remove-default');
bootstrapUtils.addStyle(Navbar, 'remove-default');
bootstrapUtils.addStyle(ControlLabel, 'remove-default');
bootstrapUtils.addStyle(Button, ...['remove-default', 'as-link']);

const store = configureStore();

store.subscribe(() => {
  saveState({ initialSearch: store.getState().initialSearch });
});

store.dispatch(startListeningToAuthChanges());
store.dispatch(startListeningForSignatures());
store.dispatch(startListeningForCampaigns());

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
