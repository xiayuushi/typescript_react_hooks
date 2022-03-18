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
