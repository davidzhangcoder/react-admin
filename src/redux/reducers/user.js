import React from 'react'
import {combineReducers} from 'redux'

import { 
    LOGIN,
    SET_LOGIN_STATUS,
    GET_USER_PERMISSIONS } from '../action_types'

const initalUser = {
    isLoginned: false,
    authToken:{},
    permissions:[]
};

function user(user = initalUser, action){
    switch (action.type) {
        case SET_LOGIN_STATUS:
            // console.log('setLoginStatus')
            return Object.assign( {...user}, {isLoginned:true, authToken:action.data});
            //return {isLoginned:true, authToken:action.data}
        case GET_USER_PERMISSIONS:
            console.log("action", action)
            return Object.assign( {...user}, {permissions: action.data})
        default:
            return user;
    }
}

export default combineReducers({
    user
})