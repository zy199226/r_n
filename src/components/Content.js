import React, {Component} from 'react';
import {connect} from 'react-redux';

import {switchCollected} from '../actions/actions';
import {time} from '../until/value';

import {List, Button} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;


class Content extends Component {
	constructor() {
		super();
		this.state = {
			isCollected: false
		};
	}

	componentWillMount() {
		// this.update(this.props);
	}

	componentWillReceiveProps(newProps) {
		if (this.props.collectedTopics !== newProps.collectedTopics || this.props.article.id !== newProps.article.id) {
			this.update(newProps);
		}
	}

	update(props) {
		const {article, login, collectedTopics} = props;
		if (login.success && collectedTopics && collectedTopics.length !== 0) {
			let isCollected = collectedTopics.some(topic => {
				return article.id === topic.id;
			});
			this.setState({
				isCollected: isCollected
			});
		}
	}

	render() {
		const {login, article, dispatch} = this.props;

		return (
			<div>
				{(() => {
					if (article && article.author) {
						return (
							<div style={{background: '#fff'}}>
								<List>
									<Item thumb={article.author.avatar_url}>
										<div>
											<span>{article.author.loginname}</span>
											<span style={{float:'right'}}>发表于{time(article.create_at)}</span>
										</div>
									</Item>
								</List>
								<div style={{
									padding: '20px 30px',
									borderBottom: '1px solid #ddd'
								}}>
									<h1 style={{
										fontSize: '44px',
										lineHeight: '1.6em',
										margin: '0',
									}}>{article.title}</h1>
									<div>
										<span style={{
											lineHeight: '1.6em'
										}}>{`${article.reply_count}/${article.visit_count}`}</span>
										{login.loginname
											?
											(<Button type={this.state.isCollected ? 'primary' : 'ghost'} inline size='small' style={{
												float: 'right'
											}} onClick={() => {
												this.setState({
													isCollected: !this.state.isCollected
												});
												dispatch(switchCollected(this.state.isCollected, login.accessToken,
												article.id, login.loginname));
											}}>{this.state.isCollected ? '已关注' : '关注'}</Button>)
											:
											<span></span>
										}
									</div>
								</div>
								<div className='mb' dangerouslySetInnerHTML={{__html: article.content}}></div>
							</div>
						);
					}
				})()}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		article: state.article.data,
		login: state.login,
		collectedTopics: state.profile.collectedTopics
	};
};

export default connect(mapStateToProps)(Content);
