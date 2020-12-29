import React from 'react'
import {combineReducers} from 'redux'

import {
    GET_BRANDS
} from '../action_types'

const initialBrands = {
    brands:[],
    totalBrands:0,
    isLoading:true,
}
function brands(state = initialBrands, action) {
    switch (action.type) {
        case GET_BRANDS:
            return { ...action.data , isLoading: false};
        default:
            return initialBrands;
    }
}

export default combineReducers({
    brands
})