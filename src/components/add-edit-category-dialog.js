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
        console.log("AddEditCategoryDialog - constructor");
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
        console.log(categoryNameInputRef.value);
        this.category.name = categoryNameInputRef.value;

        //do validate
        if( !categoryNameInput || !categoryNameInput.value.trim) {
            message.warn("分类名不能为空");
        }

        this.handleCancel();
        const response = await reqSaveCategory(this.category)
        const { data, status } = response;
        if (status === 200) {
            message.success("添加分类成功")
        }
    }

    handleOkForAdd = async () => {
        // console.log(this.form.getFieldsValue());
        this.form.validateFields(async (err, values) => {
            if (!err) {
                this.handleCancel();
                const { parentCategoryID, categoryName } = values
                const category = { parent_id: parentCategoryID, name: categoryName }
                const response = await reqSaveCategory(category)
                const { data, status } = response;
                console.log(response);
                if (status === 200) {
                    message.success("添加分类成功")
                }
                else {
                    console
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
        console.log("AddEditCategoryDialog - render", this.props.type, this.props.categoryForEdit);
        if (this.props.type === 'add') {
            const ui = (
                <Modal
                    title={this.props.title}
                    visible={this.state.showDialog && this.props.readyToShow}
                    onOk={this.handleOkForAdd}
                    onCancel={this.handleCancel}
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
