import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

export type rootReducerType = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeWithDevTools())

export default store

