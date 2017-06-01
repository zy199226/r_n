import React, {Component} from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';

import {switchSupport, fetchContent} from '../actions/actions';
import {time} from '../until/value';

import {List, TextareaItem, Button} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

class ContentList extends Component {
    constructor() {
        super();
        this.state = {
            isSupported: [],
            supportNum: []
        };
    }

    supportState(replies, login) {
        let isSupported = replies.map(reply => {
            return reply.ups.some(up => up === login.id);
        });
        let supportNum = replies.map(reply => reply.ups.length);
        this.setState({isSupported, supportNum});
    }

    componentWillMount() {
        const {reply, login} = this.props;
        if (reply) {
            this.supportState(reply, login);
        }
    }

    componentWillReceiveProps(newProps) {
        const {reply, login} = newProps;
        if (reply) {
            this.supportState(reply, login);
        }
    }

    render() {
        const {topicId, login, reply, dispatch} = this.props;

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
                        return (reply.map((i, key) => <Item key={key} thumb={i.author.avatar_url} wrap style={{
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
                                    float: 'right',
                                    color: this.state.isSupported[key]
                                        ? 'red'
                                        : '#333'
                                }} onClick={() => {
                                    dispatch(switchSupport(login.accessToken, i.id, topicId));
                                }}>{this.state.supportNum[key]}赞</span>
                                <span style={{
                                    float: 'right',
                                    marginRight: '1em'
                                }} onClick={() => {
                                    let text = this.refs[key];
                                    if (text.clientHeight === 0) {
                                        text.style.cssText = 'height: auto;padding: 30px;overflow: hidden;';
                                        text.querySelector('textarea').focus();
                                    } else {
                                        text.style.cssText = 'height: 0; padding: 0;overflow: hidden';
                                        text.querySelector('textarea').blur();
                                        text.value = `@${i.author.loginname} `;
                                    }
                                }}>回复</span>
                            </div>
                            <div ref={key} style={{
                                height: '0',
                                boxSizing: 'border-box',
                                overflow: 'hidden'
                            }}>
                                <TextareaItem  defaultValue={`@${i.author.loginname} `} data-seed="logId" autoHeight style={{
                                    background: '#eee'
                                }}/>
                                <Button type='primary' inline size="large" style={{
                                    marginTop: '2em'
                                }} onClick={() => {
                                    let text = this.refs[key].querySelector('textarea');
                                    dispatch(fetchContent(login.accessToken, text.value, topicId, i.id));
                                    text.value = `@${i.author.loginname} `;
                                    this.refs[key].style.cssText = 'height: 0; padding: 0;overflow: hidden';
                                    text.blur();
                                }}>回复</Button>
                            </div>
                        </Item>));
                    }
                })()}
                <div style={{
                    padding: '30px'
                }}>
                    <TextareaItem ref='text' placeholder="请输入内容" data-seed="logId" autoHeight/>
                    <Button type='primary' inline size="large" style={{
                        marginTop: '2em'
                    }} onClick={() => {
                        dispatch(fetchContent(login.accessToken, this.refs.text.refs.textarea.value, topicId));
                        this.refs.text.refs.textarea.value = '';
                    }}>回复</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {reply: state.article.data.replies, login: state.login, topicId: state.article.topicId};
};

export default connect(mapStateToProps)(ContentList);
