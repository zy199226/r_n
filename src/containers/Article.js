import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Article extends Component {
	componentDidMount() {
		let {data} = this.props;
		console.log(data);
	}

	render() {
		let {data} = this.props;

		return (
			<div>
				<h1>
					哈哈
				</h1>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		data: state.home
	};
};

export default connect(mapStateToProps)(Article);
