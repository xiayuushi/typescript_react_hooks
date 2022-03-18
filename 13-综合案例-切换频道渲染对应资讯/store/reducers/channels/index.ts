import { XxxChannelsActionType } from '../../actions/channels'

type XxxChannelsStateType = {
  channels: { id: number, name: string }[],
  activeId: number
}

const initState: XxxChannelsStateType = {
  channels: [],
  activeId: 0
}


const channelsReducer = (state = initState, action: XxxChannelsActionType): XxxChannelsStateType => {
  if (action.type === 'CHANNELS/GET_CHANNELS') {
    return {
      ...state,
      channels: action.payload
    }
  }
  if (action.type === 'CHANNELS/TOGGLE_CHANNEL') {
    return {
      ...state,
      activeId: action.id
    }
  }
  return state
}

export default channelsReducer

// redux与react-redux在TS项目中操作状态（定义reducer、action、dispatch）的流程
// st1、在各个reducer中，定义state初始值（需要根据接口文档返回的服务器数据格式进行定义）
// st2、在各个reducer中，对当前模块的reducer的state赋初始值（并用上定义好的TS类型），第二参数action因为还不清楚逻辑可以先暂定为any类型
// st3、在各个action中，定义actionCreator之前可以先定义当前action模块的TS类型并按需导出（这个类型会在对应的reducer模块中使用到）
// st4、在各个action中，定义actionCreator（会返回各个模块action.type的函数）
// st5、在需要操作redux中管理的状态（数据）的时候，通过react-redux的useDispatch()返回的diapatch对象来提交对应的action.type
// st6、回到该action.type对应的reducer中进行逻辑处理，此时应指定其对应的action的TS类型（即，由之前暂定的any类型改为更具体的TS类型，以便在后续的操作中获得TS的类型提示支持）



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

// st5、使用以上定义好的类型（可以导入到所需模块中，替换之前的单独模块的类型）
