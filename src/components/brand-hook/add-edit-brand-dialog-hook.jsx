import React from 'react'
import {
    Modal
} from 'antd'

import AddEditBrandForm from '../brand/add-edit-brand-form'
import { DIALOG_TYPE } from '@/config/constants'
import { reqSaveBrand } from '@/api/ajax'

export default function AddEditBrandDialogHook({type, visible, brandForEdit, onClose}) {

    const addEditBrandForm = React.createRef();

    const handleOKForAdd = async () => {
        console.log(addEditBrandForm.current.getResultFromRef())
        const {...brand} = addEditBrandForm.current.getResultFromRef();
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
        handleCancel();
    }

    const handleOKForUpdate = async () => {
        console.log(addEditBrandForm.current.getResultFromRef())
        const {name, letter} = addEditBrandForm.current.getResultFromRef();
        const brand = { ...name , ...letter };
        const response = await reqSaveBrand(brand);
        const { data, status } = response;
        if (status === 200) {
            message.success("修改品牌成功")
        } else {
            message.success("修改品牌失败")
        }
        handleCancel();        
    }

    const handleOK = () => {
        if( type === DIALOG_TYPE.add ) {
            handleOKForAdd();
            handleCancel();
        }
        else if( type === DIALOG_TYPE.edit ) {
            handleOKForUpdate();
            handleCancel();
        }
    }

    const handleCancel = () => {
        // console.log("AddEditBrandDialog - handleCancel")
        addEditBrandForm.current.reset();
        onClose();
    }

    const ui = (
        <Modal
            title={type===DIALOG_TYPE.add?"添加":"修改"}
            visible={visible}
            onOk={handleOK}
            onCancel={handleCancel}
        >
            <AddEditBrandForm
                brandForEdit = {brandForEdit}
                ref={ addEditBrandForm }
            >
            </AddEditBrandForm>
        </Modal>
    );
    return ui;
}