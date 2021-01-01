import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd';
import { Button } from 'antd';
import { Table, Divider, Tag, Icon } from 'antd';
import { Spin } from 'antd';
import { message } from 'antd';

import {
    getCategoriesByPage,
    getCategoriesByParentID
} from '../../redux/actions'
import AddEditCategoryDialog from '@/components/add-edit-category-dialog'
import AddForm from '@/components/category/add-form'
import EditForm from '@/components/category/edit-form'
import {
    reqSaveCategory,
} from '@/api/ajax'


// const columns = [
//     {
//         title: '分类的名城',
//         dataIndex: 'name',
//         key: 'name',
//         width: '70%',
//         render: text => <a>{text}</a>,
//     },
//     {
//         title: '操作',
//         key: 'action',
//         render: (text, record) => (
//             <span>
//                 <button onClick={this.showEditCategoryDialog}>修改分类</button>
//                 <Divider type="vertical" />
//                 <a>查看子分类</a>
//             </span>
//         ),
//     },
// ];

// const data = [
//     {
//         key: '1',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//         tags: ['nice', 'developer'],
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//         tags: ['loser'],
//     },
//     {
//         key: '3',
//         name: 'Joe Black',
//         age: 32,
//         address: 'Sidney No. 1 Lake Park',
//         tags: ['cool', 'teacher'],
//     },
// ];

// let params = {
//     key: '',
//     descending: true,
//     page: 0,
//     rowsPerPage: 5,
//     sortBy: "id"
// };

const PAGE_SIZE = 5;

class Category extends React.PureComponent {

    params = {
        key: '',
        descending: true,
        page: 0,
        rowsPerPage: PAGE_SIZE,
        sortBy: "id",
        parentID: 0,
    };

    constructor(props) {
        super(props)
        console.log("Category - constructor");
        this.state = {
            categoryForEdit: {},
            navCategories: []
        }

        this.form = {};
        this.parentID = 0;
        this.categoryForEdit = {};
        this.addDialog = null;
        this.editDialog = null;
        this.columns = [
            {
                title: '分类的名城',
                dataIndex: 'name',
                key: 'name',
                width: '70%',
                render: text => <a>{text}</a>,
            },
            {
                title: '操作',
                key: 'action',
                render: (category) => (
                    <span>
                        <button onClick={() => this.showEditCategoryDialog(category)} type="primary"><span>修改分类</span></button>
                        {
                            category.parent ? (
                                <Fragment>
                                    <Divider type="vertical" />
                                    <button onClick={() => this.showSubCategory(category)} type="primary"><span>查看子分类</span></button>
                                </Fragment>
                            ) : null
                        }
                    </span>
                ),
            },
        ];

        this.showSubCategory = this.showSubCategory.bind(this);
    }


    // setAddDialogRef = e => this.addDialog = e;

    // setEditDialogRef = e => this.editDialog = e;

    getNewParameter = (parentID) => {
        return {
            key: '',
            descending: true,
            page: 0,
            rowsPerPage: PAGE_SIZE,
            sortBy: "id",
            parentID: parentID,
        };
    }

    showSubCategory(category) {
        this.state.navCategories.push(category);
        this.params = this.getNewParameter(category.id);
        this.props.getCategoriesByPage(this.params);
    }

    showSubCategoryFromNav(index, id) {
        this.state.navCategories.splice(index);
        this.setState({navCategories:[...this.state.navCategories]});

        // this.params = this.getNewParameter(id);
        // this.props.getCategoriesByPage(this.params);
    }

    showEditCategoryDialog = (category) => {
        this.setState({ categoryForEdit: category })
        this.editDialog.showDialog();
    }

    showAddCategoryDialog = (event) => {
        // event.preventDefault();
        this.addDialog.showDialog();
        this.props.getCategoriesByParentID(this.parentID)
    }

    callBack = () => {
        this.props.getCategoriesByPage(this.params);
    }

    getTitle = () => {
        if (this.state.navCategories.length == 0)
            return "一级品类列表"
        else {
            let nav = this.state.navCategories.map((item, index) => {
                if (index + 1 === this.state.navCategories.length)
                    return <span key={index}>{item.name}</span>
                else
                    return <span key={index}>
                        <span><button type="primary" onClick={() => this.showSubCategoryFromNav(index + 1, item.id)}>{item.name}</button></span>
                        <Icon type='arrow-right' style={{ marginRight: 5 }} />
                    </span>
            });
            nav.unshift(
                <span key="-1">
                    <span><button type="primary" onClick={() => this.showSubCategoryFromNav(0, 0)}>一级品类列表</button></span>
                    <Icon type='arrow-right' style={{ marginRight: 5 }} />
                </span>);
            return nav;
        }
    }

    render() {
        console.log('this.props.categoriesByPage: ', this.props.categoriesByPage)

        const { total, totalPage, items } = this.props.categoriesByPage
        if (this.props.isLoadingGetCategoriesByPage) {
            return (
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin />
                </div>);
        }
        else {
            const title = this.getTitle();

            const addButton = (
                <Button type="primary" icon="plus" onClick={this.showAddCategoryDialog}>
                    添加分类
                </Button>
            );
            const ui = (
                <Card title={title} extra={addButton} style={{ width: '100%', height: '100%' }}>
                    <Table
                        columns={this.columns}
                        dataSource={items}
                        rowKey="id"
                        pagination={{
                            current: this.params.page,
                            total: total,
                            defaultPageSize: PAGE_SIZE,
                            showQuickJumper: true,
                            onChange: (page) => {
                                this.params.page = page;
                                this.props.getCategoriesByPage(this.params);
                            }
                        }}
                    />

                    <AddEditCategoryDialog
                        title="添加分类"
                        type="add"
                        categoriesByParent={this.props.categoriesByParent}
                        readyToShow={this.props.isLoadedGetCategoriesByParentID}
                        ref={(e) => this.addDialog = e}
                        callBack={this.callBack}
                    >
                    </AddEditCategoryDialog>

                    <AddEditCategoryDialog
                        title="修改分类"
                        type="edit"
                        categoryForEdit={this.state.categoryForEdit}
                        ref={(e) => this.editDialog = e}
                        callBack={this.callBack}
                    >
                    </AddEditCategoryDialog>

                </Card>
            );

            return ui;
        }
    }

    componentDidMount() {
        // this.props.isLoadingGetCategoriesByPage = true;
        this.props.getCategoriesByPage(this.params);
    }
}

//1.通过React-Redux设置props,会触发render
//如相editform中设置category={this.props.categoryForEdit}，并不会触发render
const mappingProps = state => {
    // console.log("mappingProps", state);
    return {
        isLoadingGetCategoriesByPage: state.category.category.isLoading,
        categoriesByPage: state.category.category.byPage,

        isLoadedGetCategoriesByParentID: state.category.category.isLoadedByParentID,
        categoriesByParent: state.category.category.byParentID
    }
}

const mappingDispatch = {
    getCategoriesByPage,
    getCategoriesByParentID
}

export default connect(mappingProps, mappingDispatch)(Category);