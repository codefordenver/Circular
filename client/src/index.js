import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import routes from './routes';
import './stylesheets/main.css';
import configureStore from './redux/configureStore';
import { saveState } from './redux/localStorage';

import { ControlLabel } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';

bootstrapUtils.addStyle(ControlLabel, 'remove-default');

const store = configureStore();

store.subscribe(() => {
  saveState({ initialSearch: store.getState().initialSearch });
});

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
