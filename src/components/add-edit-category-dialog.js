import React from 'react'
import { Modal } from 'antd'
import { Form, Icon, Input, Button, Checkbox } from 'antd';

export default function AddEditCategoryDialog(props) {


    const ui = (
        <Modal
            title={props.title}
            visible={props.visible}
            onOk={props.handleOk}
            onCancel={props.handlecancel}
        >
            {props.renderContent()}
        </Modal>
    );
    return ui;
}