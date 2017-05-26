import React, {Component} from 'react';
import {connect} from 'react-redux';

import {time} from '../until/value';

import {List, TextareaItem, Button} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class ContentList extends Component {
    render() {
        const {reply} = this.props;

        return (
            <div className='contentList'>
                {(() => {
                    if (reply) {
                        return (
                            <div>
                                <h3 style={{
                                    margin: '0',
                                    padding: '10px 30px'
                                }}>共有{reply.length}条评论</h3>
                            </div>
                        );
                    }
                })()}
                {(() => {
                    if (reply) {
                        return ([...reply].map((i, key) => <Item key={key} thumb={i.author.avatar_url} wrap style={{
                            borderBottom: '1px solid #ddd'
                        }}>
                            <div>
                                <span>{i.author.loginname}</span>
                                <span style={{
                                    float: 'right'
                                }}>{time(i.create_at)}</span>
                            </div>
                            <div dangerouslySetInnerHTML={{
                                __html: i.content
                            }} style={{
                                color: '#666',
                                fontSize: '0.9em',
                                margin: '16px 0'
                            }}></div>
                            <div>
                                <span>{key + 1}楼</span>
                                <span style={{
                                    float: 'right'
                                }}>{i.ups.length}赞</span>
                                <span style={{
                                    float: 'right',
                                    marginRight: '1em'
                                }}>回复</span>
                            </div>
                        </Item>));
                    }
                })()}
				<div style={{
					padding: '30px'
				}}>
					<TextareaItem placeholder="请输入内容" data-seed="logId" autoHeight />
					<Button type='primary' inline size="large" style={{
						marginTop: '2em'
					}}>回复</Button>
				</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {reply: state.article.data.replies};
};

export default connect(mapStateToProps)(ContentList);
