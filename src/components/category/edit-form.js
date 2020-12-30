import React, { Fragment } from 'react'
import { Form, Input } from 'antd'

class EditForm extends React.Component {
    constructor(props) {
        super(props)
        // console.log("EditForm - constructor");
        this.state = {
            name: props.category.name
        }
    }

    changeCategoryName = (e) => {
        // console.log(e.target.value)
        this.setState({ name: e.target.value })
    }

    render() {
        // console.log("EditForm - render", this.props.category)
        const form = this.props.form
        const { getFieldDecorator } = form;

        const ui = (
            <Fragment>
                <Form className="category-form">
                    <Form.Item label="分类名称">
                        <Input
                            placeholder="分类名称"
                            value={this.state.name}
                            ref={this.props.categoryNameInputRef}
                            onChange={this.changeCategoryName}
                        />

                        {/* {getFieldDecorator('categoryName', {
                            rules: [
                                { required: true, message: '必须分类名称!' },
                            ],
                            validateFirst: true,
                            initialValue: name
                        })(
                            <Input
                                placeholder="用户名分类名称"
                            />,
                        )} */}
                    </Form.Item>
                </Form>

                {/* <Input
                    placeholder="分类名称"
                    value={this.props.category.name}

                />

                <Input
                    placeholder="分类名称"
                /> */}
            </Fragment>
        );
        return ui
    }

    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps: ", !nextProps)
        this.setState({ name: nextProps.category.name });
    }
}

const wrappedAddForm = Form.create()(EditForm);
export default wrappedAddForm;