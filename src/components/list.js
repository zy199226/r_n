import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAll} from '../actions/actions';

import {windowH} from '../until/value';

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

	componentDidMount() {
		this.handleTabClick();
	}

    handleTabClick() {
		this.setState({inLoading: false});
		let {data, tab, dispatch} = this.props;
		let page = 1;
		if (data[tab] && data[tab].page) {
			page = data[tab].page + 1;
		}
		dispatch(fetchAll(tab, page));
    }

	scrollLoad(ref) {
		if (ref.firstElementChild.clientHeight - ref.scrollTop - windowH <= 200) {
			this.handleTabClick(true);
		}
	}

	render() {
		let {data, tab} = this.props;
		let tt = data[tab];

		const time = (date) => {
			let d = new Date() - new Date(date);
			let createTime = '';
			let year = Math.floor(d/365/24/60/60/1000);
			let mouth = Math.floor(d/30/24/60/60/1000);
			let day = Math.floor(d/24/60/60/1000);
			let hours = Math.floor(d/60/60/1000);
			let min = Math.floor(d/60/1000);
			let sec = Math.floor(d/1000);
			if (year >= 1) {
				createTime = `${year}年前`;
			} else if (mouth >= 1) {
				createTime = `${mouth}月前`;
			} else if (day >= 1) {
				createTime = `${day}天前`;
			} else if (hours >= 1) {
				createTime = `${hours}小时前`;
			} else if (min >= 1) {
				createTime = `${min}分钟前`;
			} else if (sec >= 1) {
				createTime = `${sec}秒前`;
			}
			return createTime;
		};

		const mapTopics = (
			<List>
				{(() => {
					if (tt && tt.topics) {
						return ([...tt.topics].map((i, index) => <Item key={index} thumb={i.author.avatar_url} multipleLine>{i.title}
							<Brief>
								<span>{`${i.reply_count}/${i.visit_count}`}</span>
								<span style={{
									marginLeft: '1em'
								}}>{tabChn[i.tab]}</span>
								<span style={{
									float: 'right'
								}}>{time(i.create_at)}</span>
							</Brief>
						</Item>));
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
