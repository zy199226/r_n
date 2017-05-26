import React, {Component} from 'react';
import {connect} from 'react-redux';

import {time} from '../until/value';

import {List, Button} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;


class Content extends Component {
	render() {
		const {article} = this.props;

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
										<Button type='ghost' inline size='small' style={{
											float: 'right'
										}}>关注</Button>
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
		article: state.article.data
	};
};

export default connect(mapStateToProps)(Content);
