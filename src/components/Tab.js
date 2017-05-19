import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeTab, fetchAll} from '../actions/actions';
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
	constructor() {
		super();
		this.handleTabClick = this.handleTabClick.bind(this);
	}

	componentWillMount() {
		const {selTab} = this.props;
		this.handleTabClick(selTab);
	}

	handleTabClick(key = '1') {
		let {data, dispatch} = this.props;
		let tab = tabChn[key - 1].tab;
		if (!data[tab]) {
			dispatch(fetchAll(tab));
		}
		dispatch(changeTab(key));
	}

    render() {
        const {selTab, dispatch} = this.props;

        return (
            <div>
                <Tabs activeKey={selTab} swipeable={false} animated={true} onChange={this.handleTabClick}>
                    {tabChn.map(i => <TabPane tab={i.name} key={i.key}>
						<Lists tab={i.tab}/>
                    </TabPane>)}
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => {
	return {
		data: state.home,
		selTab: state.home.selTab
	};
};

export default connect(mapStateToProps)(Tab);
