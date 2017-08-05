import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import { configure } from "redux-auth";
import './stylesheets/main.css';

import configureStore from './redux/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(configure(
  [
    {
      default: {
        apiUrl: '/api/v1',
        authProviderPaths: {
          facebook:  '/auth/acebook/callback',
          google:    '/auth/google_oauth2'
        }
      }
    }
  ], 
  {
    isServer: false, 
    cookies: document.cookie, 
    currentLocation: window.location.href,
    cleanSession: true,
    clientOnly: true
  }
)).then(() => {
  render((
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  ), document.getElementById('root'));
  registerServiceWorker();
});