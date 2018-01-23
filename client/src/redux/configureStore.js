import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import apiMiddleware from './middleware/api';
import rootReducer from './reducers/index';
import { loadState } from './localStorage';

export default function configureStore() {
  const persistedState = loadState();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(logger, thunk, apiMiddleware()))
  );

  return store;
}
