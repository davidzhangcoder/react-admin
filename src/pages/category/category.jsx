import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd';
import { Button } from 'antd';
import { Table, Divider, Tag } from 'antd';
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

let params = {
    key: '',
    descending: true,
    page: 0,
    rowsPerPage: 5,
    sortBy: "id"
};


class Category extends React.Component {
    constructor(props) {
        super(props)
        console.log("Category - constructor");
        this.state = {
            categoryForEdit:{}
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
                        <Divider type="vertical" />
                        <a><span>查看子分类</span></a>
                    </span>
                ),
            },
        ];
    
    }


    setAddDialogRef = e => this.addDialog = e;

    setEditDialogRef = e => this.editDialog = e;

    showEditCategoryDialog = (category) => {
        this.setState({categoryForEdit:category})
        this.editDialog.showDialog();
    }

    showAddCategoryDialog = (event) => {
        // event.preventDefault();
         this.addDialog.showDialog();
        this.props.getCategoriesByParentID(this.parentID)
    }

    render() {
        console.log('this.props.categoriesByPage: ', this.props.categoriesByPage)
        if (this.props.isLoadingGetCategoriesByPage) {
            return (
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin />
                </div>);
        }
        else {
            const addButton = (
                <Button type="primary" icon="plus" onClick={this.showAddCategoryDialog}>
                    添加分类
                </Button>
            );
            const ui = (
                <Card title="一级品类列表" extra={addButton} style={{ width: '100%', height: '100%' }}>
                    <Table
                        columns={this.columns}
                        dataSource={this.props.categoriesByPage.items}
                        rowKey="id"
                    />

                    <AddEditCategoryDialog
                        title="添加分类"
                        type="add"
                        categoriesByParent={this.props.categoriesByParent}
                        readyToShow={this.props.isLoadedGetCategoriesByParentID}
                        ref={this.setAddDialogRef}
                    >
                    </AddEditCategoryDialog>

                    <AddEditCategoryDialog
                        title="修改分类"
                        type="edit"
                        categoryForEdit={this.state.categoryForEdit}
                        ref={this.setEditDialogRef}
                    >
                    </AddEditCategoryDialog>

                </Card>
            );

            return ui;
        }
    }

    componentDidMount() {
        // this.props.isLoadingGetCategoriesByPage = true;
        this.props.getCategoriesByPage(params);
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