import React from 'react'
import {connect} from 'react-redux'

import cssobj from './header.scss'

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const ui = (
            <div className={cssobj.header}>
                <div id={cssobj.header_top}>
                    <span>欢迎</span>
                    <span>Admin</span>
                    <span>退出</span>
                </div>
                <div id={cssobj.header_bottom}>
                    <div id={cssobj.header_title}>{this.props.title}</div>
                    <div id={cssobj.header_time}>2020-12-20</div>
                </div>
            </div>
        );
        return ui;
    }
}

const mapProps = state => ({
    title:state.common.title
});

const mapDispatch = {

}

export default connect(mapProps, mapDispatch)(Header);