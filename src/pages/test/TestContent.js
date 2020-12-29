import React from 'react'
import { connect } from 'react-redux'
import ReactTypes from 'prop-types'
import { Menu, Icon } from 'antd';

import {
    getTestActionAsyncCreator,
    getTestInitialActionCreator
} from './test_action';
import menuList from '../../config/menuConfig';

const { SubMenu } = Menu;

class TestContent extends React.Component {
    constructor(props) {
        super(props);
        this.initial();
    }

    static propTypes = {
        getTestActionAsyncCreator: ReactTypes.func.isRequired,
        getTestInitialActionCreator: ReactTypes.func.isRequired
    }

    initial() {
        console.log('initial()', this.props);
        this.props.getTestInitialActionCreator();
    }

    render() {
        console.log('TestContent - render()', this.props);
        const ui = (
            <div>
                TestContent - {this.props.test}
                <button onClick={this.doOnClick}>doOnClick</button>
                <button onClick={this.goToAdmin}>Go To Admin</button>

                {/* <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>Option 1</span>
                    </Menu.Item>

                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>Navigation One</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </Menu> */}

                <Menu mode="inline" theme="dark">
                    {this.getMenuNodes(menuList)}
                </Menu>
            </div>
        );

        return ui;
    }

    getMenuNodes = (menulist) => {
        const resultArray = menulist.map(item => {
            if (item.children) {
                const ui = (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                );
                return ui;
            }
            else {
                const ui = (
                    <Menu.Item key={item.key}>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </Menu.Item>
                );
                return ui;
            }
        });
        return resultArray;
    }

    doOnClick = () => {
        this.props.getTestActionAsyncCreator();
    }

    goToAdmin = () => {
        this.props.history.replace('/admin');
    }
}

const mapProps = state => ({
    // test: state.test.test
    test: (function () {
        console.log('mapProps() : ', state)
        return state.test.test;
    }
    )()
})

const mapDispatch = {
    getTestActionAsyncCreator,
    getTestInitialActionCreator
}

export default connect(mapProps, mapDispatch)(TestContent);