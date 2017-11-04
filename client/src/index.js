import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import './stylesheets/main.css';

import configureStore from './redux/configureStore';
import { saveState } from './redux/localStorage';

const store = configureStore();

store.subscribe(() => {
  saveState(store.getState());
});

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
