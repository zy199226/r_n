import React, {Component} from 'react';
import {connect} from 'react-redux';
import AnotherHeader from '../components/AnotherHeader';
import {Button, InputItem} from 'antd-mobile';
import {windowH} from '../until/value';
import {fetchLogin} from '../actions/actions';

class Login extends Component {
    login(event) {
        const {dispatch} = this.props;
        let token = document.querySelector('.token input').value;
        dispatch(fetchLogin(token));
        window.localStorage.setItem('accesstoken', token);
    }

    render() {
        return (
            <div>
                <AnotherHeader title='登录' />
                <div style={{
                    height: windowH - 90,
                    background: '#fff',
                    padding: '120px 30px',
                    boxSizing: 'border-box'
                }}>
                    <InputItem className='token' placeholder='请输入Access Token' style={{
                        border: '1px solid #ddd',
                        background: '#f8f8f8'
                    }}/>
                    <Button type='primary' size='large' style={{
                        marginTop: '2rem'
                    }} onClick={() => this.login()}>登陆</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
};

export default connect(mapStateToProps)(Login);
