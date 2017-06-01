import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAll, fetchLogin} from '../actions/actions';

class App extends Component {
	componentWillMount() {
		let {pic, dispatch} = this.props;
		if (!pic) {
			dispatch(fetchLogin('001d61da-10c6-4313-9b96-5689237d3fd8'));
		}
	}

	render() {
		return (
			<div>{this.props.children}</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		data: state.home,
		pic: state.login.pic,
	};
};

export default connect(mapStateToProps)(App);
