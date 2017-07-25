import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './stylesheets/main.css';

import configureStore from './redux/configureStore';

const store = configureStore();

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
