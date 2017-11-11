import { createStore, combineReducers } from 'redux'
import usersReducer from '../reducers/users'
import rolesReducer from '../reducers/roles'

export default () => createStore(
  combineReducers({
    usersReducer,
    rolesReducer
  })
)