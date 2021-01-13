import React from 'react'
import {
    Modal
} from 'antd'

import AddEditBrandForm from './add-edit-brand-form'
import { DIALOG_TYPE } from '@/config/constants'
import { reqSaveBrand } from '@/api/ajax'

export default class AddEditBrandDialog extends React.PureComponent {

    constructor(props) {
        super(props);
        this.addEditBrandForm = React.createRef();
    }
    
    handleOKForAdd = async () => {
        console.log(this.addEditBrandForm.current.getResultFromRef())
        const {...brand} = this.addEditBrandForm.current.getResultFromRef();
        // const brand = { ...name , ...letter };
        console.log("handleOKForAdd",brand);
        const response = await reqSaveBrand(brand);
        console.log("handleOKForAdd",response);
        const { data, status } = response;
        if (status === 200) {
            message.success("添加品牌成功")
        } else {
            message.success("添加品牌失败")
        }
        this.handleCancel();
    }

    handleOKForUpdate = async () => {
        console.log(this.addEditBrandForm.current.getResultFromRef())
        const {name, letter} = this.addEditBrandForm.current.getResultFromRef();
        const brand = { ...name , ...letter };
        const response = await reqSaveBrand(brand);
        const { data, status } = response;
        if (status === 200) {
            message.success("修改品牌成功")
        } else {
            message.success("修改品牌失败")
        }
        this.handleCancel();        
    }

    handleOK = () => {
        const {type} = this.props
        if( type === DIALOG_TYPE.add ) {
            this.handleOKForAdd();
            this.handleCancel();
        }
        else if( type === DIALOG_TYPE.edit ) {
            this.handleOKForUpdate();
            this.handleCancel();
        }
    }

    handleCancel = () => {
        // console.log("AddEditBrandDialog - handleCancel")
        this.addEditBrandForm.current.reset();
        this.props.onClose();
    }

    render() {
        const {type, visible, brandForEdit} = this.props
        const ui = (
            <Modal
                title={type===DIALOG_TYPE.add?"添加":"修改"}
                visible={visible}
                onOk={this.handleOK}
                onCancel={this.handleCancel}
            >
                <AddEditBrandForm
                    brandForEdit = {brandForEdit}
                    ref={ this.addEditBrandForm }
                >

                </AddEditBrandForm>
            </Modal>
        );
        return ui;
    }

    componentWillUnmount() {
        console.log("AddEditBrandDialog - componentWillUnmount");
    }
}