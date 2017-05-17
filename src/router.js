import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './containers/App';
import Header from './components/Header';
import Article from './containers/Article';


const routes = (
	<Route path='/' component={App}>
		<IndexRoute component={Header}/>
		<Route path='/topic/:id' component={Article} />
	</Route>
);

export default routes;
