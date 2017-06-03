import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchMessage} from '../actions/actions';

import AnotherHeader from '../components/AnotherHeader';
import MessageList from '../components/messageList';
import {Tabs} from 'antd-mobile';
const TabPane = Tabs.TabPane;

const tabMessage = [
    {
        name: '未读消息',
        tab: 'hasNotRead',
        key: 1
    }, {
        name: '已读消息',
        tab: 'hasRead',
        key: 2
    }
];

class Login extends Component {
    componentWillReceiveProps(newProps) {
        const {accesstoken, dispatch} = newProps;
        if (accesstoken) {
            dispatch(fetchMessage(accesstoken));
        }
    }

    render() {
        return (
            <div>
                <AnotherHeader title='信息' />
                <Tabs defaultActiveKey='1' swipeable={false} animated={true} onChange={() => {}}>
                    {tabMessage.map(i => <TabPane tab={i.name} key={i.key}>
						<MessageList tab={i.tab}/>
                    </TabPane>)}
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        accesstoken: state.login.accessToken
    };
};


export default connect(mapStateToProps)(Login);
