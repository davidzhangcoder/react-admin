import React from 'react';
import { connect } from "react-redux"
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
import AddEditBrandDialog from '../../components/brand/add-edit-brand-dialog'
import { DIALOG_TYPE } from '@/config/constants'

class Brand extends React.Component {

    state = {
        showAddEditDialog:false,
        dialogType:DIALOG_TYPE.add,
        brandForEdit:{}
    }

    constructor(props) {
        super(props);
        this.inital();
    }

    inital = () => {
        this.columns = [
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
                        <button type="primary" onClick={() => this.onclickEditBrandDialog(brand)}><span>修改品牌</span></button>
                        <Divider type="vertical" />
                        <button type="primary"><span>查看品牌</span></button>
                    </span>
                ),
            },
        ];

        this.params = {
            key: '',
            descending: true,
            page: 0,
            rowsPerPage: PAGE_SIZE,
            sortBy: "id",
            parentID: 0,
        };

        // this.addEditBrandDialogRef = null;
    }

    onclickAddBrandDialog = () => {
        this.setState({showAddEditDialog:true, dialogType:DIALOG_TYPE.add, brandForEdit:{}})
    }

    onclickEditBrandDialog = (brand) => {
        this.setState({showAddEditDialog:true, dialogType:DIALOG_TYPE.edit, brandForEdit:brand})
    }

    onCloseAddEditDialog = () => {
        this.setState({showAddEditDialog:false})
    }

    render() {
        // console.log(this.props);
        const { total, totalPage, items } = this.props.brandData
        const { dialogType, showAddEditDialog , brandForEdit } = this.state
        if (this.props.isBrandsListLoading) {
            return (
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spin />
                </div>);
        }
        else {
            const title = <span>品牌列表</span>;
            const addButton = (
                <Button type="primary" icon="plus" onClick={this.onclickAddBrandDialog}>
                    添加品牌
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
                                this.props.getBrands(this.params);
                            }
                        }}
                    />

                    <AddEditBrandDialog
                        type={dialogType}
                        visible={showAddEditDialog}
                        brandForEdit={brandForEdit}
                        onClose={this.onCloseAddEditDialog}
                    >
                    </AddEditBrandDialog>
                </Card>
            );
            return ui
        }
    }

    componentDidMount() {
        this.props.getBrands(this.params);
    }
}

const mapToProps = state => {
    // console.log(state)
    return {
        isBrandsListLoading: state.brand.brands.isLoading,
        brandData: state.brand.brands.brandData
    }
}

const mapTodispatcher = {
    getBrands
}

// const test_mapTodispatcher = dispatcher => {
//     return {
//         getBrands: () => {
//             return dispatcher(getBrands)
//         }
//     }
// }

export default connect(mapToProps, mapTodispatcher)(Brand);