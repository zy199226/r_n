import React, {Component} from 'react';
import {NavBar} from 'antd-mobile';


class AnotherHeader extends Component {
    render() {
        const {title} = this.props;

        return (
            <NavBar
                leftContent="back"
                mode="dark"
                onLeftClick={() => history.back()}>
                {title}
            </NavBar>
        );
    }
}

export default AnotherHeader;
