import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAll} from '../actions/actions';

class App extends Component {
	componentWillMount() {
		
	}

	render() {
		return (
			<div>{this.props.children}</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		data: state.home
	};
};

export default connect(mapStateToProps)(App);
