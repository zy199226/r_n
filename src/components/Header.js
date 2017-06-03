import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {openChange, fetchLogin, loginOut} from '../actions/actions';

import {windowH} from '../until/value';

import {NavBar, Drawer, List, Icon, Button} from 'antd-mobile';
import Tab from '../components/Tab';

const Item = List.Item;

class Header extends Component {
	constructor() {
		super();
		this.state={
			open: false
		};
	}

	componentWillMount() {

	}

    render() {
        const {loginName, pic, dispatch} = this.props;

        const sidebar = (
			<div style={{
				minWidth: '8rem'
			}}>
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
				{loginName
					?
					(
						<div>
							<p style={{
								textAlign: 'center',
								marginBottom: '1.2rem'
							}}>{loginName}</p>
							<Button type='primary' size='large' style={{
								width: '5rem',
								margin: '1rem auto'
							}} onClick={() => {
								window.localStorage.removeItem('accesstoken');
								dispatch(loginOut());
							}}>退出登陆</Button>
							<List>
								<Link key='login' to='center' style={{
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
					)
					:
					<Button type='primary' size='large' style={{
						width: '4rem',
						margin: '2rem auto 0'
					}} onClick={() => window.location.href = './#/login'}>登陆</Button>
				}
			</div>
        );

        return (
            <div>
                <NavBar iconName="ellipsis" onLeftClick={() => this.setState({open: !this.state.open})} rightContent={[<Link key='Add' to={loginName ? `publishTopic` : 'login'} style={{
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
                }} sidebar={sidebar} open={this.state.open} position='left'>
					<Tab />
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
		pic: state.login.pic,
		loginName: state.login.loginname
	};
};

export default connect(mapStateToProps)(Header);
