import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchAll} from '../actions/actions';

import {windowH, time} from '../until/value';

import {ListView, List} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;


const tabChn = {
	all: '全部',
	good: '精华',
	share: '分享',
	ask: '问答',
	job: '招聘'
};

class Lists extends Component {
	constructor() {
		super();
		this.handleTabClick = this.handleTabClick.bind(this);
		this.scrollLoad = this.scrollLoad.bind(this);
	}

	componentWillMount() {
		let {data, tab, dispatch} = this.props;
		// console.log(document.querySelectorAll('.am-tabs-tabpane-active'));
		if (data[tab] && data[tab].scrollT) {
			this.refs[tab].scrollTop = data[tab].scrollT;
		}
	}

    handleTabClick() {
		let {data, tab, dispatch} = this.props;
		let page = 1;
		if (data[tab] && data[tab].page) {
			page = data[tab].page + 1;
		}
		dispatch(fetchAll(tab, page));
    }

	scrollLoad(ref) {
		if (ref.firstElementChild.clientHeight - ref.scrollTop - windowH <= 200) {
			this.handleTabClick();
		}
	}

	render() {
		let {data, tab} = this.props;
		let tt = data[tab];

		const mapTopics = (
			<List>
				{(() => {
					if (tt && tt.topics) {
						return ([...tt.topics].map((topics, index) => <Link key={index} to={`topic/${topics.id}`}><Item key={index} thumb={topics.author.avatar_url} multipleLine>{topics.title}
							<Brief>
								<span>{`${topics.reply_count}/${topics.visit_count}`}</span>
								<span style={{
									marginLeft: '1em'
								}}>{tabChn[topics.tab]}</span>
								<span style={{
									float: 'right'
								}}>{time(topics.create_at)}</span>
							</Brief>
						</Item></Link>));
					}
				})()}
			</List>
		);

		return (
			<div style={{
				maxHeight: windowH - 177,
				overflowY: 'scroll'
			}} ref={tab} onScroll={() => {
				this.scrollLoad(this.refs[tab]);
			}}>
				{mapTopics}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		data: state.home
	};
};

export default connect(mapStateToProps)(Lists);
