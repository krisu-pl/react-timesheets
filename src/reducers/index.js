import { combineReducers } from 'redux'

import calendar from './calendar'
import users from './users'

const rootReducer = combineReducers({
  calendar,
  users,
})

export default rootReducer
