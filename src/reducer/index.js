// import { ADD_ARTICLE } from "../constant/action.types";
import { combineReducers } from 'redux'

import loading from './loading.reducer'
import error from './error.reducer'
import omdb from './omdb.reducer'

export default combineReducers({
  error,
  loading,
  omdb
})