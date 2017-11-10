import { createStore, combineReducers } from 'redux'
import usersReducer from '../reducers/users'

export default () => createStore(
  combineReducers({
    usersReducer
  })
)