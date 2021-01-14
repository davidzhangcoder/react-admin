import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    Spin,
    Card,
    Table,
    Divider,
    Button
} from 'antd';

import {
    getBrands
} from '../../redux/actions';
import { PAGE_SIZE } from '@/config/constants'
import AddEditBrandDialogHook from '../../components/brand-hook/add-edit-brand-dialog-hook'
import { DIALOG_TYPE } from '@/config/constants'

const params = {
    key: '',
    descending: true,
    page: 0,
    rowsPerPage: PAGE_SIZE,
    sortBy: "id",
    parentID: 0,
};

const BrandHook = () => {

    const isBrandsListLoading = useSelector(state => state.brand.brands.isLoading)
    const brandData = useSelector(state => state.brand.brands.brandData)
    const dispatch = useDispatch();

    const [dialogType,setDialogType] = useState(DIALOG_TYPE.add)
    const [showAddEditDialog,setShowAddEditDialog] = useState(false)
    const [brandForEdit,setBrandForEdit] = useState({})

    useEffect( () => {
        dispatch(getBrands(params))
    },[])

    const columns = 
        [
            {
                title: '品牌的名称',
                dataIndex: 'name',
                key: 'name',
                width: '70%',
                render: text => <a>{text}</a>,
            },
            {
                title: '操作',
                key: 'action',
                render: (brand) => (
                    <span>
                        <button type="primary" onClick={() => onclickEditBrandDialog(brand)}><span>修改品牌</span></button>
                        <Divider type="vertical" />
                        <button type="primary"><span>查看品牌</span></button>
                    </span>
                ),
            },
        ]
    

    const onclickAddBrandDialog = () => {
        setDialogType(DIALOG_TYPE.add)
        setShowAddEditDialog(true)
        setBrandForEdit({})
    }

    const onCloseAddEditDialog = () => {
        setShowAddEditDialog(false)
    }

    const onclickEditBrandDialog = (brand) => {
        setDialogType(DIALOG_TYPE.edit)
        setShowAddEditDialog(true)
        setBrandForEdit(brand)
    }

    const { total, totalPage, items } = brandData
    if (isBrandsListLoading) {
        return (
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin />
            </div>);
    }
    else {
        const title = <span>品牌列表</span>;
        const addButton = (
            <Button type="primary" icon="plus" onClick={onclickAddBrandDialog}>
                添加品牌
            </Button>
        );
        const ui = (
            <Card title={title} extra={addButton} style={{ width: '100%', height: '100%' }}>
                <Table
                    columns={columns}
                    dataSource={items}
                    rowKey="id"
                    pagination={{
                        current: params.page,
                        total: total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: (page) => {
                            params.page = page;
                            // console.log(params);
                            dispatch(getBrands(params));
                        }
                    }}
                />

                <AddEditBrandDialogHook
                    type={dialogType}
                    visible={showAddEditDialog}
                    brandForEdit={brandForEdit}
                    onClose={onCloseAddEditDialog}
                >
                </AddEditBrandDialogHook>
            </Card>
        );
        return ui
    }
}

export default BrandHook;