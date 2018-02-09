import React from 'react';
import { render } from 'react-dom';
import RedBox from 'redbox-react';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createDebounce from 'redux-debounced';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import { App } from './components/app/App';

import { applicationReducers } from './reducers';

import { BASE_URL } from './config';


const history = createHistory({
  basename: BASE_URL,
});

/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;
/* eslint-disable no-underscore-dangle */

const reducer = combineReducers({
  ...applicationReducers,
  router: routerReducer,
});

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(
    routerMiddleware(history),
    thunk,
    createDebounce(),
  )),
);

const AppWithProvider = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

const root = document.getElementById('root');

if (process.env.NODE_ENV !== 'production') {
  try {
    render(<AppWithProvider />, root);
  } catch (e) {
    render(<RedBox error={e} />, root);
  }
} else {
  render(<AppWithProvider />, root);
}
