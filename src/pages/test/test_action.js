import { reqLogin } from '../../api/ajax'

const getTestActionCreater = (response) => ({type:'getTest', data:response})

export const getTestActionAsyncCreator = () => {
    return async dispatch => {
        const response = await reqLogin('test','11111')
        // console.log(response);
        if( response.status === 200)
            dispatch(getTestActionCreater(response))
    }
    // return { type: LOGIN, data: {username, password} };
}

export const getTestInitialActionCreator = () => ({type:'getTestInitial',data:''})