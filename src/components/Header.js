import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {openChange, fetchLogin} from '../actions/actions';

import {windowH} from '../until/value';

import {NavBar, Drawer, List, Icon} from 'antd-mobile';
import Tab from '../components/Tab';

const Item = List.Item;

class Header extends Component {
	componentWillMount() {

	}

    render() {
        const {loginName, drawer, pic, dispatch} = this.props;

        const sidebar = (
			<div>
				<div style={{
					width: '4rem',
					height: '4rem',
					borderRadius: '50%',
					margin: '3rem auto 0.5rem',
					overflow: 'hidden',
					background: '#abcdef'
				}}>
					<img src={pic} style={{
						width: '100%',
						height: '100%'
					}}></img>
				</div>
				<p style={{
					textAlign: 'center',
					marginBottom: '1.2rem'
				}}>{loginName}</p>
				<List>
					<Link key='login' to='login' style={{
						display: 'block',
						border: '1px solid #eee',
						color: '#333',
						padding: '0.5rem 0.8rem',
						fontSize: '0.8rem'
					}}>
						个人中心
					</Link>
					<Link key='message' to='message' style={{
						display: 'block',
						border: '1px solid #eee',
						color: '#333',
						padding: '0.5rem 0.8rem',
						fontSize: '0.8rem'
					}}>
						信息
					</Link>
				</List>
			</div>
        );

        return (
            <div>
                <NavBar iconName="ellipsis" onLeftClick={() => dispatch(openChange())} rightContent={[<Link key='Add' to={`publishTopic`} style={{
					fontSize: '1.2rem',
					lineHeight: '1rem',
					color: '#fff'
				}}>+</Link>]}>cnode</NavBar>
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
		pic: state.login.pic,
		loginName: state.login.loginname
	};
};

export default connect(mapStateToProps)(Header);
