import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './containers/App';

class routes extends Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path='/' component={App}>

				</Route>
			</Router>
		);
	}
}

export default routes;
