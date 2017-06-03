import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {List} from 'antd-mobile';

import AnotherHeader from '../components/AnotherHeader';

import {time, windowH} from '../until/value';

const Item = List.Item;

class Center extends Component {
    componentWillMount() {
        // const {accessToken, dispatch} = this.props;
    }

    render() {
        const {pic, loginname, createAt, score, collectedTopics, recentReplies, recentTopics} = this.props;

        return (
            <div>
                <AnotherHeader title='个人中心'/>
                <div style={{
                    maxHeight: windowH - 90,
                    overflowY: 'auto',
                    paddingBottom: '40px',
                    boxSizing: 'border-box'
                }}>
                    <div>
                        <div style={{
                            width: '4rem',
                            height: '4rem',
                            borderRadius: '50%',
                            margin: '1rem auto 0.5rem',
                            overflow: 'hidden'
                        }}>
                            <img src={pic} style={{
                                width: '100%',
                                height: '100%'
                            }}></img>
                        </div>
                        <p style={{
                            textAlign: 'center',
                            marginTop: '0.4rem'
                        }}>{loginname}</p>
                        <p style={{
                            textAlign: 'center',
                            marginTop: '0.4rem'
                        }}>积分：{score}</p>
                        <p style={{
                            textAlign: 'center',
                            marginTop: '0.4rem'
                        }}>注册于：{time(createAt)}</p>
                    </div>
                    <div style={{
                        padding: '0 30px',
                        textAlign: 'center'
                    }}>
                        <div className='detail-list'>
                            <h3>收藏的话题</h3>
                            <List>
                                {collectedTopics.map((i, key) => <Link key={key} to={`topic/${i.id}`}><Item key={key} thumb={i.author.avatar_url} wrap style={{
                                    borderTop: '1px solid #ddd'
                                }}>
                                    {i.title}
                                </Item></Link>)}
                            </List>
                        </div>
                        <div className='detail-list'>
                            <h3>最近参与的话题</h3>
                            <List>
                                {recentReplies.map((i, key) => <Link key={key} to={`topic/${i.id}`}><Item key={key} thumb={i.author.avatar_url} wrap style={{
                                    borderTop: '1px solid #ddd'
                                }}>
                                    {i.title}
                                </Item></Link>)}
                            </List>
                        </div>
                        <div className='detail-list'>
                            <h3>最近创建的话题</h3>
                            <List>
                                {recentTopics.map((i, key) => <Link key={key} to={`topic/${i.id}`}><Item key={key} thumb={i.author.avatar_url} wrap style={{
                                    borderTop: '1px solid #ddd'
                                }}>
                                    {i.title}
                                </Item></Link>)}
                            </List>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        accessToken: state.login.accessToken,
        pic: state.profile.avatar_url,
        loginname: state.profile.loginname,
        createAt: state.profile.create_at,
        score: state.profile.score,
        collectedTopics: state.profile.collectedTopics,
        recentReplies: state.profile.recent_replies,
        recentTopics: state.profile.recent_topics
     };
};

export default connect(mapStateToProps)(Center);
