import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './containers/App';
import HomePage from './containers/HomePage';
import Article from './containers/Article';

class Routes extends Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path='/' component={App}>
					<IndexRoute component={HomePage}/>
					<Route path='topic/:id' component={Article} />
				</Route>
			</Router>
		);
	}
}

export default Routes;
