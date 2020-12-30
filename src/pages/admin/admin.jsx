import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import LeftNav from '../../components/left_nav'
import TestContent from '../test/TestContent';
import Home from '../home/home'
import Category from '../category/category'
import Product from '../category/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Header from '../../components/header'
import AddEditCategoryDialog from '../../components/add-edit-category-dialog'
import AddForm from '../../components/category/add-form'

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  constructor(props) {
    super(props)

    this.obj = {
      name:"jack"
    }

    this.state = {
      showAddCategory: false,
      count_test: 1,
      obj:this.obj
    }
    this.form = {};

    this.test_categories=[
      {
        id:"1",
        name:"电脑"
      },
      {
        id:"2",
        name:"图书"
      }
    ]
  }

  showAddCategoryDialog = () => {
    this.setState({ showAddCategory: true })
  }

  setForm = (form) => {
    this.form = form;
  }

  renderContent = (form) => {
    const ui = (<AddForm setForm={this.setForm} categories={this.test_categories}></AddForm>)
    return ui;
  }

  handleOk = () => {
    console.log( this.form.getFieldsValue() );

    // 对所有表单字段进行检验
    this.form.validateFields(async (err, values) => {
      // 检验成功
      if (!err) {
        const {categoryName} = values
      } else {
        console.log('检验失败!')
        return;
      }
    });

  }

  handlecancel = () => {
    // console.log('handlecancel');
    this.setState({ showAddCategory: false })
  }

  doCountTest = () => {
    //此种使用setState有错误，因为是"同一周期内多次设置","并且在同一周期内会对多个 setState 进行批处理","后调用的 setState() 将覆盖同一周期内先调用 setState 的值"
    //3次+1 最终只会加1
    //所有回调console.log(this.state)中this.state的值是 最终只会加1 后的值
    //测试 count_test
    this.setState({count_test: this.state.count_test + 1} , () => console.log("1",this.state))
    this.setState({count_test: this.state.count_test + 1} , () => console.log("2",this.state))
    this.setState({count_test: this.state.count_test + 1} , () => console.log("3",this.state))
    //console.log("final",this.state)

    // //此种使用setState 正确, 所有回调console.log(this.state)中this.state的值是 3次+1 后的值
    // this.setState( (state,props) => { return {count_test: state.count_test + 1} } , () => console.log(this.state))  
    // this.setState( (state,props) => ({count_test: state.count_test + 1}) , () => console.log(this.state))
    // this.setState( (state,props) => ({count_test: state.count_test + 1}) , () => console.log(this.state))
    // // console.log("final",this.state)
  }

  doStateTest = () => {
    this.obj.name="tom";
    this.setState({obj:this.obj})
  }

  render() {
    // console.log('Admin - render()')

    // 测试 Object.assign()
    // let a = {
    //   name:"aaa",
    //   age:1
    // };

    // let b = {
    //   age:2
    // }

    // let c = {
    //   isLoading:true
    // }

    // let d = Object.assign({}, a , b ,c)
    // console.log("d : " , d);

    //测试 Object.assign()同一周期内多次设置
    // let a = {
    //   name:"aaa",
    //   age:1
    // };

    // console.log( Object.assign( a , {age: a.age + 1 } , {age: a.age + 1 }) )

    // const ui = (
    //   <div className="login">
    //     Admin
    //     <div>
    //       <Link to="/admin/test">Test</Link>
    //     </div>
    //     <Button type="primary" icon="plus" onClick={this.showAddCategoryDialog}>
    //       <span>添加分类</span>
    //     </Button>
    //     <hr/>
    //     <Button type="primary" icon="plus" onClick={this.doCountTest}>
    //       <span>测试 count_test</span>
    //     </Button>
    //     <hr/>
    //     <Button type="primary" icon="plus" onClick={this.doStateTest}>
    //       <span>测试state中对象的值</span>
    //     </Button>
    //     <br/>
    //     name: {this.state.obj.name}
    //     <div>
    //       =======
    //                 <Route path="/admin/test" component={TestContent} ></Route>
    //     </div>

    //     <AddEditCategoryDialog
    //       title="添加分类"
    //       visible={this.state.showAddCategory}
    //       handleOk={this.handleOk}
    //       handlecancel={this.handlecancel}
    //       renderContent={this.renderContent}
    //     >
    //     </AddEditCategoryDialog>
    //   </div>
    // );

    const ui = (
        <Layout style={{height:'100%'}}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{margin:20, backgroundColor: '#ffffff'}}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/charts/bar" component={Bar}></Route>
              <Route path="/charts/line" component={Line}></Route>
              <Route path="/charts/pie" component={Pie}></Route>
            </Switch>
          </Content>
          <Footer style={{textAlign:'center', color:'#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>      
    );

    return ui
  }
}

export default Admin