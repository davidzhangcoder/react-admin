import React, { Fragment, useImperativeHandle, useEffect } from 'react'
import { Form, Input } from 'antd'

import { useInputState } from '@/config/hookers'

// way2
const AddEditBrandForm = (props, ref) => {
    // console.log(props.brandForEdit.name)

    const brandNameInput = useInputState("");
    const {setValue:setBrandNameValue, ...brandElement } = brandNameInput

    const letterInput = useInputState("");
    const {setValue:setLetterValue, ...letterElement } = letterInput

    useEffect(() => {
        // console.log(props.brandForEdit.name)
        setBrandNameValue(props.brandForEdit.name);
        setLetterValue(props.brandForEdit.letter);
      },[props.brandForEdit.name, props.brandForEdit.letter]);

    // way1
    // useImperativeHandle(props.componentRef, () => ({
    useImperativeHandle(ref, () => ({
            getResultFromRef: () => {
                return getResult();
            },
            reset

            // working
            // getResultFromRef:getResult

            // working
            // getResult
        })
    );

    const getResult = () => {
        return {
            name: brandNameInput.value,
            letter: letterInput.value
        }
    }

    const reset = () => {
        setBrandNameValue("");
        setLetterValue("");
    }

    // console.log(props);
    const {brandForEdit} = props
    return <div>
        <Fragment>
            <Form className="brand-form">
                <Form.Item label="品牌名称">
                    <Input
                        placeholder="品牌名称"
                        {...brandElement}
                    />
                </Form.Item>

                <Form.Item label="首字母">
                    <Input
                        placeholder="首字母"
                        {...letterElement}
                    />
                </Form.Item>
            </Form>

            {/* 如已有onChange, React就认为是受控组件，受控组件不能加defaultValue */}
            {/* onChange 和 defaultValue只能2个中选一个 */}
            {/* <input type="text" 
                placeholder="品牌名称"
                // {...brandNameInput}
                defaultValue={brandForEdit.name}
                /> */}
        </Fragment>
    </div>
}

// way2 -working
export default React.forwardRef(AddEditBrandForm)

// way1 - working, 函数名定义如下 : const AddEditBrandForm = (props) => {
// 
// export default  React.forwardRef((props, ref) => {
//     // console.log("props, ref", ref);
//     return <AddEditBrandForm {...props} componentRef={ref}></AddEditBrandForm>
// });

// export default AddEditBrandForm;