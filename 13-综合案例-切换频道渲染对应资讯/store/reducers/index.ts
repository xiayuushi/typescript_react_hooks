import { combineReducers } from 'redux'
import todos from './todos'
import channels from './channels'
import news from './news'

const rootReducer = combineReducers({
  todos,
  channels,
  news
})

export default rootReducer