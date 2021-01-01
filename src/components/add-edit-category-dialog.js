import React from 'react'
import { Modal } from 'antd'
import { message } from 'antd';

import AddForm from '@/components/category/add-form'
import EditForm from '@/components/category/edit-form'
import {
    reqSaveCategory,
} from '@/api/ajax'

export default class AddEditCategoryDialog extends React.Component {

    constructor(props) {
        super(props)
        // console.log("AddEditCategoryDialog - constructor");
        this.state = {
            showDialog: false
        }
        this.form = {};
        this.categoryNameInput = null
    }

    setCategoryNameInputRef = e => this.categoryNameInput = e

    setForm = (form) => {
        this.form = form;
    }

    showDialog = () => {
        this.setState( () => ({
            showDialog: true
        }))
    }

    handleOkForUpdate = async () => {
        // console.log(this.categoryNameInput.input.value);
        let category = Object.assign({},this.props.categoryForEdit);
        category.name = this.categoryNameInput.input.value;

        //do validate
        if( !this.categoryNameInput || !this.categoryNameInput.input.value.trim()) {
            message.warn("分类名不能为空");
        }

        const response = await reqSaveCategory(category)
        const { data, status } = response;
        if (status === 200) {
            message.success("修改分类成功")
            this.props.callBack()
        }
        this.handleCancel();
    }

    handleOkForAdd = async () => {
        // console.log(this.form.getFieldsValue());
        this.form.validateFields(async (err, values) => {
            if (!err) {
                this.handleCancel();
                const { parentCategoryID, categoryName } = values
                const category = { parentID: parentCategoryID, name: categoryName }
                const response = await reqSaveCategory(category)
                const { data, status } = response;
                console.log(response);
                if (status === 200) {
                    message.success("添加分类成功")
                    this.props.callBack()
                }
                else {
                }
            }
        }
        );
        // this.setState({ showAddCategoryDialog: false });
    }

    handleCancel = () => {
        this.setState((state, props) => ({ showDialog: false }))
    }

    render() {
        // console.log("AddEditCategoryDialog - render", this.props.type, this.props.categoryForEdit);
        if (this.props.type === 'add') {
            const ui = (
                <Modal
                    title={this.props.title}
                    visible={this.state.showDialog && this.props.readyToShow}
                    onOk={this.handleOkForAdd}
                    onCancel={()=>{
                        this.form.resetFields();
                        this.handleCancel();
                    }}
                >
                    <AddForm
                        setForm={this.setForm}
                        categories={this.props.categoriesByParent} >
                    </AddForm>
                    {/* {props.renderContent()} */}
                </Modal>
            );
            return ui;
        }
        else if (this.props.type === 'edit') {
            const ui = (
                <Modal
                    title={this.props.title}
                    visible={this.state.showDialog}
                    onOk={this.handleOkForUpdate}
                    onCancel={this.handleCancel}
                >
                    <EditForm
                        category={this.props.categoryForEdit}
                        categoryNameInputRef={this.setCategoryNameInputRef}
                    ></EditForm>
                    {/* {props.renderContent()} */}
                </Modal>
            );
            return ui;
        }
        return null;
    }
}
