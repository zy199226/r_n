import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchTopic, clearTopics} from '../actions/actions';

import {windowH, windowW} from '../until/value';

import Content from '../components/Content';
import ContentList from '../components/ContentList';

import {NavBar, Icon} from 'antd-mobile';

class Article extends Component {
    componentWillMount() {
        let {topicId, dispatch} = this.props;
		let id = window.location.href.split('topic/')[1];
		if (topicId != id) {
            dispatch(clearTopics());
			dispatch(fetchTopic(id));
		}
    }

    render() {
        let {topicId, data} = this.props;

        return (
            <div>
                <NavBar
					leftContent="back"
					mode="dark"
					onLeftClick={() => history.back()}
					rightContent={[<Icon key="1" type="ellipsis" />]}>
					详情
				</NavBar>
				<div style={{
					maxHeight: windowH - 90,
					overflowY: 'scroll',
					overflowX: 'hidden'
				}}>
					<Content />
					<ContentList />
				</div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
		data: state.home,
		topicId: state.article.topicId
	};
};

export default connect(mapStateToProps)(Article);
