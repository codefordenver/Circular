import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { configure } from 'redux-auth';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import './stylesheets/main.css';

import configureStore from './redux/configureStore';
import { saveState } from './redux/localStorage';

const store = configureStore();

store.subscribe(() => {
  saveState(store.getState());
});

const history = syncHistoryWithStore(browserHistory, store);

store
  .dispatch(
    configure(
      {
        apiUrl: process.env.REACT_APP_GOOGLE_CALLBACK_URL ||'http://localhost:3001',
        authProviderPaths: {
          facebook: '/auth/facebook',
          google: '/auth/google_oauth2'
        }
      },
      {
        isServer: false,
        cookies: document.cookie,
        currentLocation: window.location.href,
        cleanSession: true,
        clientOnly: true
      }
    )
  )
  .then(() => {
    render(
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>,
      document.getElementById('root')
    );
    registerServiceWorker();
  });
