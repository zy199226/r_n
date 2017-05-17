import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAll} from '../actions/actions';
import Lists from '../components/List';

import {Tabs} from 'antd-mobile';
const TabPane = Tabs.TabPane;

const tabChn = [
    {
        name: '全部',
        tab: 'all',
        key: 1
    }, {
        name: '精华',
        tab: 'good',
        key: 2
    }, {
        name: '分享',
        tab: 'share',
        key: 3
    }, {
        name: '问答',
        tab: 'ask',
        key: 4
    }, {
        name: '招聘',
        tab: 'job',
        key: 5
    }
];

class Tab extends Component {

    render() {
        const {dispatch} = this.props;

        return (
            <div>
                <Tabs defaultActiveKey="1" animated={true}>
                    {tabChn.map(i => <TabPane tab={i.name} key={i.key}>
						<Lists tab={i.tab}/>
                    </TabPane>)}
                </Tabs>
            </div>
        );
    }
}

export default Tab;
