import React from 'react'
import {combineReducers} from 'redux'

import {SET_HEADER_TITLE} from '../action_types'

const default_header = '首页'
function title(state = default_header, action){
    switch (action.type) {
        case SET_HEADER_TITLE:
            return action.data;
        default:
            return state;
    }
}

export default combineReducers({
    title:title
})