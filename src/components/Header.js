import React, {Component} from 'react';
import {connect} from 'react-redux';
import {openChange} from '../actions/actions';

import {NavBar, Drawer, List} from 'antd-mobile';

class Header extends Component {
    render() {
        const {drawer, dispatch} = this.props;

        const sidebar = (
            <List>
                {[...Array(20).keys()].map((i, index) => {
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
        );

        return (
            <div>
                <NavBar iconName="ellipsis" onLeftClick={() => dispatch(openChange())}>cnode</NavBar>
                <Drawer className="my-drawer" style={{
                    minHeight: document.documentElement.clientHeight - 42
                }} dragHandleStyle={{
                    display: 'none'
                }} contentStyle={{
                    color: '#A6A6A6',
                    textAlign: 'center',
                    paddingTop: 42
                }} sidebar={sidebar} open={drawer} position='left'>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {drawer: state.drawer};
};

export default connect(mapStateToProps)(Header);
