// REACT
import React from 'react';
import { render } from 'react-dom';

// REACT-ROUTER
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import routes from './routes';

// REDUX STORE
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../app/state';
import { configureStore } from '../app/state/store/configureStore'; 

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// Create Redux store with initial state
// const store = createStore(reducers, preloadedState, applyMiddleware(thunk))
const store = configureStore(preloadedState); 

const AppRouter = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  )
}

render(<AppRouter />, document.getElementById('root'));