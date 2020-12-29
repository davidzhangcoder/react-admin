import axios from 'axios'

import common from './common'

function ajax(url, data = {} , type = 'GET') {
    console.log(url,data)
    if( type === TYPES.GET ){
        return axios.get(url, {
            params: data
          })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
    }
    else {
        return axios.post(url, data)
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
    }
}

const TYPES = {
    GET: 'GET',
    POST: 'POST'
}

const BASE_URL = 'http://api.leyou.com/api';

export const reqLogin = (username, password) => {
    // console.log(common)
    // console.log(common.stringify({username, password}));
    return ajax(BASE_URL +'/auth/login', common.stringify({username, password}), TYPES.POST)
}

export const reqBrands = (param) => {
    return ajax(BASE_URL +'/item-service/brand/getBrands', param, TYPES.GET)
}

export const reqCategoriesByPage = (param) => {
    return ajax(BASE_URL +'/item-service/category/getCategoriesByPage', param, TYPES.GET)
}

export const reqCategoriesByParentID = (parentID) => {
    return ajax(BASE_URL +'/item-service/category/getCategoriesByParentID', parentID, TYPES.GET)
}

export const reqSaveCategory = (category) => {
    return ajax(BASE_URL +'/item-service/category/persistCategory', category, TYPES.POST)
}

// export const reqWeather = () => {
//     new Promise()
//     jsonp(url, optins , ()=>{})
// }



