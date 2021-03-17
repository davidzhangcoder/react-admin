import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import LeftNav from '../../components/left_nav'
import TestContent from '../test/TestContent';
import Home from '../home/home'
import Brand from '../brand/brand'
import BrandHook from '../brand-hook/brand-hook'
import Category from '../category/category'
import Product from '../category/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Header from '../../components/header'
import Login from '../login/login'
import AddEditCategoryDialog from '../../components/category/add-edit-category-dialog'
import AddForm from '../../components/category/add-form'
import { LOGIN } from '../../redux/action_types';

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  constructor(props) {
    super(props)

    this.obj = {
      name: "jack"
    }

    this.state = {
      showAddCategory: false,
      count_test: 1,
      obj: this.obj
    }
    this.form = {};

    this.test_categories = [
      {
        id: "1",
        name: "电脑"
      },
      {
        id: "2",
        name: "图书"
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
    console.log(this.form.getFieldsValue());

    // 对所有表单字段进行检验
    this.form.validateFields(async (err, values) => {
      // 检验成功
      if (!err) {
        const { categoryName } = values
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
    this.setState({ count_test: this.state.count_test + 1 }, () => console.log("1", this.state))
    this.setState({ count_test: this.state.count_test + 1 }, () => console.log("2", this.state))
    this.setState({ count_test: this.state.count_test + 1 }, () => console.log("3", this.state))
    //console.log("final",this.state)

    // //此种使用setState 正确, 所有回调console.log(this.state)中this.state的值是 3次+1 后的值
    // this.setState( (state,props) => { return {count_test: state.count_test + 1} } , () => console.log(this.state))  
    // this.setState( (state,props) => ({count_test: state.count_test + 1}) , () => console.log(this.state))
    // this.setState( (state,props) => ({count_test: state.count_test + 1}) , () => console.log(this.state))
    // // console.log("final",this.state)
  }

  doStateTest = () => {
    this.obj.name = "tom";
    this.setState({ obj: this.obj })
  }

  render() {
    // console.log('Admin - render()')

    // 1.
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

    // 2.
    //测试 Object.assign()同一周期内多次设置
    // let a = {
    //   name:"aaa",
    //   age:1
    // };

    // console.log( Object.assign( a , {age: a.age + 1 } , {age: a.age + 1 }) )

    // 3.
    // var sources = [{ a: "A" }, { b: "B" }, { c: "C" }];
    // //options = Object.assign.apply(Object, [{}].concat(sources));
    // // or
    // const options = Object.assign({}, ...sources);
    // console.log( options );

    // 4.
    // const a = {
    //   name: "jack",
    //   member: {
    //     type: "vehicle",
    //     factory: {
    //       name: "honda",
    //       address: {
    //         country: "canada"
    //       }
    //     }
    //   }
    // }
    // // const b = {...a}
    // // console.log( b == a , b === a , b.member == a.member , b.member === a.member );

    // const b = JSON.parse(JSON.stringify(a))
    // console.log(b);
    // console.log(b == a, b === a, b.member == a.member, b.member === a.member);

    // 5.
    // var a = 20;
    // var b = a;
    // b = 30;
    // console.log(a, b);

    // 6.
    // var a = 20;

    // function test() {
    //   var b = a + 10;

    //   function innerTest() {
    //     var c = 10;
    //     return b + c + a;
    //   }

    //   return innerTest();
    // }
    // console.log( test() );

    // 7
    // for (let i = 0; i < 5; i++) 
    // {
    //   setTimeout(() => console.log(i), 3000)
    // }

    //ok
    // for (var i = 1; i <= 5; i++) {
    //   setTimeout(
    //     function(a) {
    //       return function () {console.log(a)}
    //     }(i)
    //     , i * 3000);
    // }

    //wrong
    // for (var i = 1; i <= 5; i++) {
    //   setTimeout(function timer() {
    //     console.log(i);
    //   }, i * 1000);
    // }

    //ok
    // for (let i = 1; i <= 5; i++) {
    //   setTimeout(
    //     function () {
    //       return function () { console.log(i) }
    //     }(),i * 1000)
    // }

    // 7.1
    // let closureObj = {i:0};
    // for ( closureObj.i = 1; closureObj.i <= 5; closureObj.i++) {
    //   setTimeout(
    //     function(a) {
    //       return function () {console.log(a.i)}
    //     }(closureObj)
    //     , closureObj.i * 1000);
    // }


    // 8.
    // function husiting() {
    //   console.log(a);
    //   var a = 1;
    //   a= 2
    //   var a = 3
    //   console.log(a);
    //   return;
    // }
    // husiting();

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
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ margin: 20, backgroundColor: '#ffffff' }}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/brand" component={Brand}></Route>
              <Route path="/brand-hook" component={BrandHook}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/charts/bar" component={Bar}></Route>
              <Route path="/charts/line" component={Line}></Route>
              <Route path="/charts/pie" component={Pie}></Route>
              {/* <Route component={Login}></Route> */}
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#cccccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    );

    return ui
  }
}

export default Admin