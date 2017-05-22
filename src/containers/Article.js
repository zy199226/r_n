import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {fetchTopic} from '../actions/actions';

import {NavBar, Icon} from 'antd-mobile';

class Article extends Component {
    componentWillMount() {
        let {dispatch} = this.props;
		let id = window.location.href.split('topic/')[1];
		dispatch(fetchTopic(id));
    }

    render() {
        let {data} = this.props;

        return (
            <div>
                <NavBar
					leftContent="back"
					mode="dark"
					onLeftClick={() => history.back()}
					rightContent={[<Icon key="1" type="ellipsis" />]}>
					详情
				</NavBar>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {data: state.home};
};

export default connect(mapStateToProps)(Article);
