import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAll, fetchLogin, fetchDetail} from '../actions/actions';

class App extends Component {
	componentWillMount() {
		const {dispatch} = this.props;
		const accesstoken = window.localStorage.getItem('accesstoken');
		if (accesstoken) {
			dispatch(fetchLogin(accesstoken));
		}
	}

	componentWillReceiveProps(newProps) {
		
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
		accessToken: state.login.accessToken,
		loginName: state.login.loginname
	};
};

export default connect(mapStateToProps)(App);
