import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import './stylesheets/main.css';

import configureStore from './redux/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
