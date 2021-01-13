import React , { useState } from 'react'

export const useInputState = (initalvalue) => {
    const [value, setValue] = useState(initalvalue);

    const onChange = (e) => {
        setValue(e.target.value)
    }

    return {value,onChange,setValue}
}