import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import IndexSagas from './sagas';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './stylesheets/main.css';

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware))
);

const store = configureStore();

sagaMiddleware.run(IndexSagas);

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
