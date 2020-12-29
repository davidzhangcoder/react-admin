import {combineReducers} from 'redux'

import {
    GET_CATEGORIES_BY_PAGE,
    GET_CATEGORIES_BY_PARENTID,
    GET_CATEGORIES_BY_PAGE_LOADING,
    GET_CATEGORIES_BY_PARENTID_LOADING
} from '../action_types'

const initialCategory = {
    isLoading: true,
    isLoadedByParentID: false,
    byPage:[],
    byParentID:[]
}
function category(state = initialCategory, action) {
    switch (action.type) {
        case GET_CATEGORIES_BY_PAGE:
            const dataByPage = action.data;
            return Object.assign({...state}, {byPage:dataByPage, isLoading: false} )
        case GET_CATEGORIES_BY_PARENTID:
            const dataByParentID = action.data;
            return Object.assign({...state}, {byParentID:dataByParentID, isLoadedByParentID: true} )
        case GET_CATEGORIES_BY_PAGE_LOADING:
            return Object.assign( {...state}, {isLoading:true} );
        case GET_CATEGORIES_BY_PARENTID_LOADING:
            return Object.assign( {...state}, {isLoadedByParentID:false} );
        default:
            return state;
    }
}

export default combineReducers({
    category
})