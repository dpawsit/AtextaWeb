import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPromise from 'redux-promise';
import { Router, browserHistory } from 'react-router'
import { persistStore, autoRehydrate, storages } from 'redux-persist'


import routes from './routes'
import reducers from './reducers';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

function configureStore() {
	return new Promise((resolve, rejct) => {
		try {
			const store = createStore(reducers, undefined, compose(
					autoRehydrate(),applyMiddleware(ReduxPromise)))

			persistStore(store, storages.asyncSessionStorage, ()=> resolve(store));
		}
		catch (error) {
			reject(error);
		}
	})
}

configureStore().then(store => {
	ReactDOM.render(
		<Provider store={store}>
			<Router history={browserHistory} routes={routes}/>
		</Provider>, document.getElementById('App'))
	})
	.catch(error=>{console.log('this is the error', error)})

