import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import { Router, browserHistory, hashHistory } from 'react-router';
import configureStore from './store/configureStore';
import routes from './router';

import './styles/index.css';

let store = configureStore();

store.subscribe(() => {
	// console.log(store.getState());
});

render(
	<Provider store={store}>
		<Router routes={routes} history={hashHistory}/>
	</Provider>,
	document.getElementById('root')
);
