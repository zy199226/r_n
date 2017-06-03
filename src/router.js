import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './containers/App';
import HomePage from './containers/HomePage';
import Article from './containers/Article';
import PublishTopic from './containers/PublishTopic';
import Center from './containers/Center';
import Message from './containers/Message';
import Login from './containers/Login';

class Routes extends Component {
	render() {
		return (
			<Router history={hashHistory}>
				<Route path='/' component={App}>
					<IndexRoute component={HomePage}/>
					<Route path='topic/:id' component={Article} />
					<Route path='publishTopic' component={PublishTopic} />
					<Route path='center' component={Center} />
					<Route path='message' component={Message} />
					<Route path='login' component={Login} />
				</Route>
			</Router>
		);
	}
}

export default Routes;
