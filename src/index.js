import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import Router from './router';

import './styles/index.css';

let store = configureStore();

store.subscribe(() => {
	// console.log(store.getState());
});

render(
	<Provider store={store}>
		<Router/>
	</Provider>,
	document.getElementById('root')
);
