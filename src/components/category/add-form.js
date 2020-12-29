import React from 'react'
import { Form, Input } from 'antd';
import { Select } from 'antd';

const { Option } = Select;

class AddForm extends React.Component {
    render() {
        // 得到具强大功能的form对象
        // console.log("Addform : ", this.props);
        const form = this.props.form
        const { getFieldDecorator } = form;

        const ui = (
            <Form className="category-form">
                <Form.Item label="所属分类" >
                    {
                        getFieldDecorator('parentCategoryID', {
                            initialValue: '0'
                        })(
                            <Select >
                                <Option value='0'>一级分类</Option>
                                {
                                    this.props.categories.map(
                                        item => <Option key={item.id} value={item.id}>{item.name}</Option>
                                    )
                                }
                            </Select>)
                    }
                </Form.Item>

                <Form.Item label="分类名称">
                    {getFieldDecorator('categoryName', {
                        rules: [
                            { required: true, message: '必须分类名称!' },
                        ],
                        validateFirst: true
                    })(
                        <Input
                            placeholder="用户名分类名称"
                        />,
                    )}
                </Form.Item>
            </Form>
        );

        return ui;

    }

    componentWillMount() {
        if (this.props.setForm)
            this.props.setForm(this.props.form)
    }
}

const wrappedAddForm = Form.create()(AddForm);
export default wrappedAddForm;