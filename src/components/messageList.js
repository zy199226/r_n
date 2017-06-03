import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {windowH, time} from '../until/value';

import {List} from 'antd-mobile';
const Item = List.Item;

class messageList extends Component {
    componentWillMount() {}

    componentWillReceiveProps(newProps) {}

    render() {
        const {message, tab} = this.props;

        return (
            <div style={{
                maxHeight: windowH - 187,
                overflowY: 'auto',
                padding: '0 30px 30px',
                boxSizing: 'border-box'
            }}>
                {(() => {
                    if (!message[tab].length) {
                        return (<div>
                            <p style={{
                                textAlign: 'center',
                                lineHeight: '2rem'
                            }}>没有消息</p>
                        </div>);
                    }
                })()}
                {message[tab].map((i, key) => <Link key={key} to={`topic/${i.topic.id}`}>
                    <div style={{
                        background: '#fff',
                        boxShadow: '0 0 20px #ddd',
                        marginTop: '30px',
                        color: '#333',
                        padding: '10px',
                        lineHeight: '1rem'
                    }}>
                        <p style={{
                            color: '#abcdef'
                        }}>{i.author.loginname}</p>
                        <p>于{time(i.reply.create_at)}回复了您</p>
                        <div dangerouslySetInnerHTML={{__html: i.reply.content}}></div>
                    </div>
                </Link>)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        message: state.message
    };
};

export default connect(mapStateToProps)(messageList);
