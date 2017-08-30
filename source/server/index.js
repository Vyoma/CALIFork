// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import { StaticRouter } from 'react-router-dom';
// import Template from './template'; 
// import App from '../app/components/App';

// REACT
import React from 'react'
import { renderToString } from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';

// REDUX
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

// REDUCERS 
import reducers from '../app/state'

// ROUTES
import routes from '../client/routes';

// HELMET -> META-DATA
import { Helmet } from 'react-helmet';

import template from './templateHTML'

// Create a new Redux store instance
const store = createStore(reducers, applyMiddleware(thunk));

export default function serverRenderer({ clientStats, serverStats }) {
	return (req, res, next) => {

		const branch = matchRoutes(routes, req.url);
		const promises = branch.map(({ route, match }) => {
		  let fetchData = route.component.fetchData;
		  let params = match.params || {}; 
		  return fetchData instanceof Function ? fetchData(store, params) : Promise.resolve(null)
		});

	  return Promise.all(promises).then((data) => {
		  let context = {};

		  const helmet = Helmet.renderStatic();

		  // Render the component to a string
		  const html = renderToString(
		    <Provider store={store}>
		      <StaticRouter location={req.url} context={context}>
		        {renderRoutes(routes)}
		      </StaticRouter>
		    </Provider>
		  )

		  // Grab the initial state from our Redux store
		  const preloadedState = store.getState()

		  // Send the rendered page back to the client
		  res.send(template(html, preloadedState, helmet))
	  }).catch((err) => (
	  	console.log(err)
	  ));
	};
}