import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import apiMiddleware from './middleware/api';

import rootReducer from '../reducers/index';

export default function configureStore() {
  return createStore(
    rootReducer,
    compose(applyMiddleware(logger, apiMiddleware()))
  );
}
