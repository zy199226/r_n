import React, {Component} from 'react';

import {ListView} from 'antd-mobile';


class List extends Component {

	componentDidMount() {
		let {data} = this.props;
		let tabData = data.topics;
		console.log(tabData);
		() => {
			[...tabData].map((i) => console.log(i.title));
		};
	}


	render() {
		let {data} = this.props;
		let tabData = data.topics;

		return (
			<div onClick={() => {
				[...tabData].map((i) => console.log(i.title));
			}}>
				<h1>哈哈</h1>
				<h1></h1>
			</div>
		);
	}
}

export default List;
