import React from 'react'
import {combineReducers} from 'redux'

import user from './user'
import common from './common'
import brand from './brand'
import category from './category'
import test from '../../pages/test/test_reducers'

export default combineReducers({
    user,
    common,
    brand,
    category,
    test
})