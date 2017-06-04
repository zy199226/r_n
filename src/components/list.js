import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchAll, changeTop} from '../actions/actions';

import {windowH, time} from '../until/value';

import {List, Icon} from 'antd-mobile';
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
		if (data[tab] && data[tab].scrollT) {
			setTimeout(() => {
				this.refs[tab].scrollTop = data[tab].scrollT;
			}, 0);
		}
	}

	componentWillUnmount() {
		const {tab, dispatch} = this.props;
		dispatch(changeTop(this.refs[tab].scrollTop, tab));
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
						return ([...tt.topics].map((topics, index) => <Link key={index} to={`topic/${topics.id}`}><Item key={index} thumb={topics.author.avatar_url} multipleLine style={{
							borderTop: '1px solid #ddd'
						}}>{topics.title}
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

				<div style={{
					padding: '1rem 0',
					background: '#fff'
				}}>
					<Icon type='loading' />
					<p style={{textAlign: 'center', marginTop: '0.3rem'}}>loading</p>
				</div>

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
