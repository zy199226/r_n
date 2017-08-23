import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextareaItem, Button, Toast } from 'antd-mobile';
import { windowH } from '../until/value';

import { fetchPublish } from '../actions/actions';

class PTmain extends Component {
    constructor() {
        super();
        this.state = {
            loading: false
        };
    }

    publish() {
        const { accessToken, dispatch } = this.props;
        const tab = this.refs.tab.value;
        const title = this.refs.title.refs.textarea.value;
        const content = this.refs.content.refs.textarea.value;

        if (title.length < 10) {
            Toast.fail('标题不少于10字以下哦！', 2);
        } else {
            dispatch(fetchPublish(accessToken, title, tab, content));
            this.setState({ loading: true });
        }
    }

    render() {
        const { loading } = this.state;

        return (
            <div style={{
                padding: '120px 30px',
                background: '#fff',
                minHeight: windowH - 90,
                boxSizing: 'border-box'
            }}
            >
                <div style={{
                    lineHeight: '1.6rem'
                }}
                >
                    请选择主题类别
                    <select ref="tab"
                      style={{
                            padding: '0.1rem 0.3rem',
                            border: '1px solid #eee',
                            marginLeft: '0.8rem'
                        }}
                    >
                        <option value="ask">问答</option>
                        <option value="share">分享</option>
                        <option value="job">招聘</option>
                        <option value="dev">测试</option>
                    </select>
                </div>
                <TextareaItem ref="title"
                  placeholder="请输入标题，不少于10个字符"
                  autoHeight
                    style={{
                        background: '#f8f8f8',
                        marginTop: '1rem'
                    }}
                />
                <TextareaItem ref="content"
                  placeholder="请输入内容"
                  autoHeight
                    style={{
                        background: '#f8f8f8',
                        marginTop: '1rem'
                    }}
                />
                <Button type="primary"
                    style={{
                        marginTop: '1rem'
                    }}
                  loading={loading}
                  onClick={() => {
                        this.publish();
                    }}
                >
                    {loading ? '发布中' : '发布'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    accessToken: state.login.accessToken
});

export default connect(mapStateToProps)(PTmain);
