import React, {Component} from 'react';
import {connect} from 'react-redux';
import {openChange, fetchLogin} from '../actions/actions';

import {NavBar, Drawer, List} from 'antd-mobile';
import Tab from '../components/Tab';

class Header extends Component {
	componentDidMount() {
		let {login, dispatch} = this.props;
		dispatch(fetchLogin('001d61da-10c6-4313-9b96-5689237d3fd8'));
	}

    render() {
        const {drawer, login, dispatch} = this.props;

        const sidebar = (
			<div>
				<div className="icon">
					<img src={login}></img>
				</div>
				<List>
					<List.Item>abc</List.Item>
					{[...Array(4).keys()].map((i, index) => {
						if (index === 0) {
							return (
								<List.Item key={index} thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png" multipleLine>Category</List.Item>
							);
						}
						return (
							<List.Item key={index} thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png">Category{index}</List.Item>
						);
					})}
				</List>
			</div>
        );

        return (
            <div>
                <NavBar iconName="ellipsis" onLeftClick={() => dispatch(openChange())}>cnode</NavBar>
                <Drawer className="my-drawer" style={{
                    minHeight: document.documentElement.clientHeight - 90
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
