import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import apiMiddleware from './middleware/api';

import rootReducer from '../reducers/index';

export default function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger, apiMiddleware()))
  );
}
