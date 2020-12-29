import React from 'react'
import {combineReducers} from 'redux'

import { 
    LOGIN,
    SET_LOGIN_STATUS } from '../action_types'

const initalUser = {
    isLoginned: false
};

function user(state = initalUser, action){
    switch (action.type) {
        case SET_LOGIN_STATUS:
            // console.log('setLoginStatus')
            return {isLoginned:true}
        default:
            return state;
    }
}

export default combineReducers({
    user
})