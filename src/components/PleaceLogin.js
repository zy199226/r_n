import React, {Component} from 'react';
import {Link} from 'react-router';

class PleaceLogin extends Component {
    render() {
        return (
            <Link key='pleaceLogin' to='login' style={{
                display: 'block',
                color: '#abcdef',
                textAlign: 'center',
                lineHeight: '4rem'
            }}>乖，点击这里登陆啦！！！</Link>
        );
    }
}

export default PleaceLogin;
