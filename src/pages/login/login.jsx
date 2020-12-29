import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import scssobj from './login.scss'
import logo from '../../assets/images/logo.png'
import { login } from '../../redux/actions'


// console.log(scssobj)

class Login extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // console.log(this.props.user);

        // following code cause error:
        // Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
        // if( this.props.user && this.props.user.isLoginned )
        // {
        //     this.props.history.replace('/')
        // }

        if (this.props.user && this.props.user.user.isLoginned) {
            return (<Redirect to="/"/>)
        }

        // 得到具强大功能的form对象
        const form = this.props.form
        const { getFieldDecorator } = form;

        const ui = (
            <div className={scssobj.login}>
                <header className={scssobj.login_header}>
                    <img src={logo} />
                    <h2>React项目: 后台管理系统</h2>
                </header>
                <section className={scssobj.login_content}>
                    <h2>用户登陆</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {/* 
                            用户名/密码的的合法性要求
                                1). 必须输入
                                2). 必须大于等于4位
                                3). 必须小于等于12位
                                4). 必须是英文、数字或下划线组成
                            */ }
                            {getFieldDecorator('username', {
                                rules: [
                                    { required: true, message: '必须输入用户名!' },
                                    { min: 4, message: '必须大于等于4位!' },
                                    { max: 12, message: '必须小于等于12位' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '必须是英文、数字或下划线组成' },
                                ],
                                validateFirst: true
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    { validator: this.validatePassword }
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        );

        return ui
    }

    handleSubmit = async (event) => {
        // 阻止事件的默认行为
        event.preventDefault()

        // console.log(this.props.form.getFieldsValue())
        const { username, password } = this.props.form.getFieldsValue();

        this.props.login(username, password);

        // const response = await reqLogin(username,password)

        // console.log(response)

        // const {status} = response;
        // if( status === 200 )
        //     this.props.history.replace('/')
    }

    validatePassword = (rule, value, callback) => {
        // console.log(value)

        if (value.trim().length < 1) {
            callback('密码必须输入');
        }
        else if (value.trim().length < 4) {
            callback('密码必须大于等于4位!');
        }
        else if (value.trim().length > 12) {
            callback('密码必须小于等于12位');
        }
        else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须必须是英文、数字或下划线组成');
        }
        else {
            callback(); // 验证通过
        }

        // callback('xxxx') // 验证失败, 并指定提示的文本
    }
}

const WrapLogin = Form.create()(Login)
// export default WrapLogin

const mapProps = (state) => {
    // console.log('mapProps',state)
    return {
        user: state.user
    }
}

const mapDispatch = { login }

export default connect(
    mapProps,
    mapDispatch
)(WrapLogin);
