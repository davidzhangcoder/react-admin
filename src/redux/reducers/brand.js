import React from 'react'
import { combineReducers } from 'redux'

import {
    GET_BRANDS,
    GET_BRANDS_LOADING
} from '../action_types'

const initialBrands = {
    brandData: {},
    isLoading: true,
}
function brands(state = initialBrands, action) {
    switch (action.type) {
        case GET_BRANDS:
            return Object.assign({...state}, {brandData: action.data, isLoading: false} )
        case GET_BRANDS_LOADING:
            return Object.assign({}, initialBrands, {isLoading: true});
        default:
            return state;
    }
}

export default combineReducers({
    brands
})