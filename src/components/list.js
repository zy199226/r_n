import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAll} from '../actions/actions';

import {ListView, List} from 'antd-mobile';


class Lists extends Component {
	constructor() {
		super();
		this.handleTabClick = this.handleTabClick.bind(this);
	}

	componentDidMount() {
		this.handleTabClick();
	}

    handleTabClick() {
		let {data, tab, dispatch} = this.props;
		let page = 1;
		if (data[tab] && data[tab].page) {
			page = data[tab].page + 1;
		}
		dispatch(fetchAll(tab, page));
    }

	render() {
		let {data, tab} = this.props;
		let tt = data[tab];

		const mapTopics = (
			<List>
				{(() => {
					if (tt && tt.topics) {
						return ([...tt.topics].map((i, index) => <List.Item key={index}>{i.title}</List.Item>));
					}
				})()}
			</List>
		);

		return (
			<div>
				{mapTopics}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		data: state.home,
		selTab: state.home.selTab
	};
};

export default connect(mapStateToProps)(Lists);
