import {combineReducers} from 'redux'

const testData = 'this inital test data'
function test(data = testData, action){
    // console.log('Reducers - test', data, action)
    switch (action.type) {
        case 'getTest':
            return 'getTest - this is test data from Ajax'
        case 'getTestInitial':
            return 'getTestInitial - this inital test data';
        default:
            return data;
    }
}

export default combineReducers({
    test
})