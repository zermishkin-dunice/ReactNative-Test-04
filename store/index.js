import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './saga';

import rootReducer, {
  initialState as initialStateSample,
} from './reducers/index';

export default function (history, initialState = initialStateSample) {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [sagaMiddleware];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
  );

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers,
  );
  /* eslint-enable */
  sagaMiddleware.run(rootSaga);

  return store;
}
