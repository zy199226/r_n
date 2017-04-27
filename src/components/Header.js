import React, {Component} from 'react';
import {render} from 'react-dom';

import {NavBar} from 'antd-mobile';

class Header extends Component {
    render() {
        return (
			<NavBar iconName="ellipsis">cnode</NavBar>
		);
    }
}

export default Header;
