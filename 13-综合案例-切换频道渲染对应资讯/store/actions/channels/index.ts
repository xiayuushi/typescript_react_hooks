import axios from 'axios'
import { ThunkAction } from 'redux-thunk';
import { RootReducerType } from '../../index'


export type XxxChannelsActionType = {
  type: 'CHANNELS/GET_CHANNELS',
  payload: { id: number, name: string }[]
} | {
  type: 'CHANNELS/TOGGLE_CHANNEL',
  id: number
}

export const getChannels = (): ThunkAction<void, RootReducerType, any, XxxChannelsActionType> => {
  return async dispatch => {
    const res = await axios.get('http://toutiao.itheima.net/v1_0/channels')
    dispatch({
      type: 'CHANNELS/GET_CHANNELS',
      payload: res.data.data.channels
    })
  }
}

export const toggleChannel = (id: number): XxxChannelsActionType => {
  return {
    type: 'CHANNELS/TOGGLE_CHANNEL',
    id
  }
}



// action与reducer的类型定义流程，以及redux-thunk中ThunkAction类型的使用

// st1、先知晓需要操作的数据格式，以便定义TS类型
// 01、可以直接通过postman或者在组件中调用接口获取一次数据，以便清楚自己需要定义何种TS数据类型


// st2、定义reducer模块
// 01、定义reducer模块时，先根据接口给出数据格式定义当前reducer模块的state初始值的TS类型
// 01、（定义state初始值时，需要考虑为了实现业务逻辑，哪个数据是需要被redux管理的，然后再根据接口返回的数据格式定义其对应的TS类型）
// 02、并将该类型用于state初始值以及当前reducer函数的返回值


// st3、定义action模块
// 01、定义action模块时，通常会先定义action的类型（通常是对象类型的联合类型）
// 01、联合类型中必须有type属性，值为字面量形式，其余的属性根据自己业务需求自行定义
// 01、例如：type xxxActionType = {type: 'xxxx', name: string } | {type:'bbbb', id: number}

// 02、定义好当前action模块的类型后，再定义actionCreator（分两种情况）
// 02、情况1 actionCreator返回的是对象形式，此时只需要将 xxxActionType用做actionCreator的返回值类型即可
// 02、例如：export const actionCreator = ():xxxActionCreator => { return {type: 'xxxx' } }

// 02、情况2 actionCreator返回的是函数形式，此时需要使用reedux-thunk内置的ThunkAction类作为actionCreator的返回值类型
// 02、例如：export const actionCreator =():ThunkAction<void, RootReducerType, any, xxxActionType>=>{ return dispatch=>{ setTimeout(()=>{ dispatch({ type: 'xxxx' }) }, 1000) } }
// N1、为了复用可以将ThunkAction以及泛型参数提取为整个项目redux通用的形式（但参数4则需要处理为整个项目的rootActionType，而不是单独某个模块的xxxActionType）


// st4、定义整体reducer、action、以及thunkAction的类型
// 01、RootReducerType
// 方式1：export type RootReducerType = ReturnType<typeof store.getState> //此处store.getState不要加括号调用
// 方式2：export type RootReducerType = ReturnType<typeof rootReducer> //此处rootReducer是所有reducer模块合并后的对象，等同于store.getState
// 02、RootActionType
// 将各个action模块中自己定义好的actionType导入到某个文件中，然后重新定义为RootActionType
// 例如：export const RootActionType = xxxActionType | bbbActionType
// 03、RootThunkActionType
// 例如：export type RootThunkActionType = ThunkAction<void, RootReducerType, any, RootActionType>

// st5、使用以上定义好的类型
// 例如：原先各个action模块中使用ThunkAction的地方可以替换为RootThunkActionType
