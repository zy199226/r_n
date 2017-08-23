import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchTopic, clearTopics } from '../actions/actions';

import { windowH, windowW } from '../until/value';

import Content from '../components/Content';
import ContentList from '../components/ContentList';
import AnotherHeader from '../components/AnotherHeader';

import { NavBar, Icon } from 'antd-mobile';

class Article extends Component {
    componentWillMount() {
        const { topicId, dispatch } = this.props;
        const id = window.location.href.split('topic/')[1];
        if (topicId != id) {
            dispatch(clearTopics());
            dispatch(fetchTopic(id));
        }
    }

    render() {
        const { topicId, data } = this.props;

        return (
            <div>
                <AnotherHeader title="详情" />
                <div style={{
                    maxHeight: windowH - 90,
                    overflowY: 'scroll',
                    overflowX: 'hidden'
                }}
                >
                    <Content />
                    <ContentList />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.home,
    topicId: state.article.topicId
});

export default connect(mapStateToProps)(Article);
