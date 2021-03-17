import {
    LOGIN,
    SET_LOGIN_STATUS,
    SET_HEADER_TITLE,
    GET_BRANDS_LOADING,
    GET_BRANDS,
    GET_CATEGORIES_BY_PAGE,
    GET_CATEGORIES_BY_PARENTID,
    GET_CATEGORIES_BY_PAGE_LOADING,
    GET_CATEGORIES_BY_PARENTID_LOADING,
    GET_USER_PERMISSIONS,
} from './action_types';

import { 
    reqLogin,
    reqBrands,
    reqCategoriesByPage,
    reqCategoriesByParentID,
    reqGetUserPermissions
 } from '../api/ajax'

 import axios from 'axios'

const setLoginStatus = (data) => ({type:SET_LOGIN_STATUS, data:data})

const getBrandsToState = (brandsData) => ({type:GET_BRANDS, data:brandsData})

const sendDataToState = (type, data) => ({type, data})

export const login = (username, password) => {
    return async dispatch => {
        const response = await reqLogin(username, password)
        console.log(response);
        if( response.status === 200){
            //localStorage.setItem("token", response.data);
            //console.log(response.data)
            axios.defaults.headers.common['Authorization'] = response.data.accessToken;
            // console.log(axios.defaults.headers.common['Authorization'])

            const userId = response.data.userId;
            dispatch(getUserPermissions(response.data))
            //dispatch(setLoginStatus(response.data))
        }
    }
    // return { type: LOGIN, data: {username, password} };
}

export const getUserPermissions = (responsedata) => {
    return async dispatch => {
        const response = await reqGetUserPermissions();
        console.log(response);
        const { data, status } = response;
        if( status == 200 ){
            dispatch(sendDataToState(GET_USER_PERMISSIONS,data))
            dispatch(setLoginStatus(responsedata))
        }
    }
}

export const setHeaderTitle = (title) => ({type:SET_HEADER_TITLE, data:title})

export const getBrands = (param) => {
    return async dispatch => {
        dispatch(sendDataToState(GET_BRANDS_LOADING,{}))
        const response = await reqBrands(param)
        //  console.log(response);
        const { data, status } = response;
        if( status === 200)
            dispatch(getBrandsToState(data))
    }
}

export const getCategoriesByPage = (param) => {
    return async dispatch => {
        dispatch(sendDataToState(GET_CATEGORIES_BY_PAGE_LOADING,{}))
        const response = await reqCategoriesByPage(param)
        // console.log(response);
        const { data, status } = response;
        if( status === 200)
            dispatch(sendDataToState(GET_CATEGORIES_BY_PAGE,data))
    }
}

export const getCategoriesByParentID = (parentID) => {
    return async dispatch => {
        dispatch(sendDataToState(GET_CATEGORIES_BY_PARENTID_LOADING,{}))
        const response = await reqCategoriesByParentID({parentID})
        // console.log(response);
        const { data, status } = response;
        if( status === 200)
            dispatch(sendDataToState(GET_CATEGORIES_BY_PARENTID,data))
    }
}
