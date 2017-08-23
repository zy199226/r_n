import React, { Component } from 'react';
import { NavBar, TextareaItem, Button } from 'antd-mobile';

import AnotherHeader from '../components/AnotherHeader';
import PTmain from '../components/PTmain';
import { windowH } from '../until/value';

class PublishTopic extends Component {
    constructor() {
        super();
    }

    render() {
        const { dispatch } = this.props;

        return (
            <div>
                <AnotherHeader title="发布新话题" />
                <PTmain />
            </div>
        );
    }
}

export default PublishTopic;
