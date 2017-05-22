import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {openChange, fetchLogin} from '../actions/actions';

import {windowH} from '../until/value';

import {NavBar, Drawer, List, Icon} from 'antd-mobile';
import Tab from '../components/Tab';

const Item = List.Item;

class Header extends Component {
	componentDidMount() {
		let {login, dispatch} = this.props;
		if (!login) {
			dispatch(fetchLogin('001d61da-10c6-4313-9b96-5689237d3fd8'));
		}
	}

    render() {
        const {drawer, login, dispatch} = this.props;

        const sidebar = (
			<div>
				<div className="icon">
					<img src={login}></img>
				</div>
				<List>
					{[...Array(4).keys()].map((i, index) => {
						if (index === 0) {
							return (
								<Item key={index} multipleLine>Category</Item>
							);
						}
						return (
							<Item key={index}>Category{index}</Item>
						);
					})}
				</List>
			</div>
        );

        return (
            <div>
                <NavBar iconName="ellipsis" onLeftClick={() => dispatch(openChange())} rightContent={[<Icon key="1" type="ellipsis" />]}>cnode</NavBar>
                <Drawer className="my-drawer" style={{
                    minHeight: windowH - 90
                }} dragHandleStyle={{
                    display: 'none'
                }} contentStyle={{
                    color: '#A6A6A6',
                    textAlign: 'center'
                }} sidebar={sidebar} open={drawer} position='left'>
					<Tab />
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
		drawer: state.drawer.bollean,
		login: state.login.pic,
	};
};

export default connect(mapStateToProps)(Header);
