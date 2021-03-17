import React from 'react'
import { Menu, Icon } from 'antd';
import { Link , withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

import scssObj from './left_nav.scss'
import logo from '../assets/images/logo.png'
import menuList from '../config/menuConfig';
import {setHeaderTitle} from '../redux/actions'
import AppPermissions from '../utils/AppPermissions'

const { SubMenu } = Menu;

class LeftNav extends React.Component {
    constructor(props) {
        super(props)
        console.log("this.props.user: " , this.props.user);
        this.appPermissions = new AppPermissions(this.props.user.permissions);
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
                if( item.permissions && item.permissions.length > 0 && !this.appPermissions.hasAnyPermission(item.permissions) ) {
                    return;
                }
                const ui = (
                    <Menu.Item key={item.key}>
                        <Icon type={item.icon} />
                        <span><Link to={item.key} onClick={() => this.setHeaderTitle(item.title)}>{item.title}</Link></span>
                    </Menu.Item>
                );
                return ui;
            }
        });
        return resultArray;
    }

    setHeaderTitle = (title) => {
        this.props.setHeaderTitle(title)
    }

    render() {
        const ui = (
            <div className={scssObj.left_nav}>
                <div className={scssObj.left_nav_top}>
                    <img src={logo} alt="logo" />
                    <h2>硅谷后台</h2>
                </div>
                <div className={scssObj.left_nav_bottom}>
                    <Menu mode="inline" theme="dark">
                        {this.getMenuNodes(menuList)}
                    </Menu>
                </div>
            </div>
        );

        return ui;
    }
}

const mapProps = state => ({
    user: state.user.user
})

const mapDispatch = {
    setHeaderTitle
}

export default connect(mapProps, mapDispatch)(LeftNav);