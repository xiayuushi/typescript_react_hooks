import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reduxThunk from 'redux-thunk'
import rootReducer from './reducers'

import { ThunkAction } from 'redux-thunk'
import { XxxChannelsActionType } from './actions/channels'
import { XxxNewsActionType } from './actions/news'
import { XxxTodosActionType } from './actions/todos'

export type RootReducerType = ReturnType<typeof rootReducer>
export type RootActionType = XxxChannelsActionType | XxxNewsActionType | XxxTodosActionType
export type RootThunkActionType = ThunkAction<void, RootReducerType, any, RootActionType>

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
)

export default store

// 01、actionCreator返回的是函数时，必须使用redux-thunk这个中间件（在配置store对象时进行配置）

// 根reducer类型获取方式
// 方式1、在store/reducers中（即根reducer模块中）使用泛型工具类ReturnType与typeof操作符获取根reducer对象的返回值，并按需导出到外界
// 方式1、例如：export type TState = ReturnType<typeof rootReducer>
// 方式2、在store/index.ts中使用泛型工具类ReturnType与typeof操作符获取根reducer对象的返回值，并按需导出到外界
// 方式2、例如：export type TState = ReturnType<typeof store.getState>

// 根reducer类型使用场景（如果需要获取整个store对象的状态state，即store.getState()时，就需要该类型）
// 场景1、使用useSelector时
// 场景1、例如：const { 具体某个reducer模块 } = useSelector((state: rootStateType)=> state)
// 场景2、actionCreator返回的是函数时，ThunkAction传入4个泛型参数时，参数2就必须使用到该类型
// 场景2、例如：const actionCreator=():ThunkAction<ReturnType,rootStateType,any|unKnown, xxxActionType>=>{ return (dispatch,getState)=>{} }
