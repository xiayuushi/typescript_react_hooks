import { XxxTodosActionType } from './../../actions/todos'

export type XxxTodosStateType = {
  id: number,
  name: string,
  done: boolean
}[]

const initState: XxxTodosStateType = [
  {
    id: 1,
    name: '吃饭',
    done: true
  },
  {
    id: 2,
    name: '睡觉',
    done: true
  },
  {
    id: 3,
    name: '游泳',
    done: false
  }
]

const todosReducer = (state = initState, action: XxxTodosActionType): XxxTodosStateType => {
  if (action.type === 'ADD_TODOS') {
    return [
      {
        id: Date.now(),
        name: action.name,
        done: false
      },
      ...state
    ]
  }
  if (action.type === 'DEL_TODOS') {
    return state.filter((item) => item.id !== action.id)
  }
  if (action.type === 'CHANGE_TODOS') {
    return state.map(item => {
      if (item.id === action.id) {
        return {
          ...item,
          done: !item.done
        }
      }
      return item
    })
  }
  return state
}

export default todosReducer

// st1、在各个reducer中，定义state初始值的TS类型（需要根据接口文档返回的服务器数据格式进行定义）
// st2、在各个reducer中，对当前模块的reducer的state赋初始值（并用上定义好的TS类型），第二参数action因为还不清楚逻辑可以先暂定为any类型
// st3、在各个action中，定义actionCreator之前可以先定义当前action模块的TS类型并按需导出（这个类型会在对应的reducer模块中使用到）
// st4、在各个action中，定义actionCreator（会返回各个模块action.type的函数）
// st5、在需要操作redux中管理的状态（数据）的时候，通过react-redux的useDispatch()返回的diapatch对象来提交对应的action.type
// st6、回到该action.type对应的reducer中进行逻辑处理，此时应指定action的TS类型（即，由之前暂定的any类型改为更具体的TS类型，以便在后续的操作中获得TS的类型提示支持）

// reducer模块函数第一参数state的TS类型
// 01、可以根据接口文档返回的数据进行TS类型定义
// 02、可以明确的是reducer模块函数最终的返回值也是第一参数state的TS类型（因为reducer最终必须返回state）

// reducer模块函数第二参数action的TS类型
// 01、在初始化阶段还不知道需要提交何种action的时候，可以暂定为any类型
// 02、明确action中必须有type属性，且type属性必定是string类型
// 03、其次其他不确定的属性可以暂定为any类型，例如：`[key: string]: any`表示key是字符串类型，而值是任意类型
// 04、但是最好的做法是在action模块中书写actionCreator之前就先定义好（因此忽略上面02与03的参考）
// 04、例如：store/actions/xxx模块
// 04、例如：export XxxActionType = { type: '各action.type一致的字面量类型', key: 值具体的类型 } | { type: '各action.type一致的字面量类型', key: 值具体的类型 }
// 04、可参考此处的XxxTodosActionType，type属性是字面量类型，不确定的参数是具体的某个类型，当前action模块整体是联合类型
// 04、定义好action的类型后给reducer模块第二参数action使用后，就会有对应的action.type类型提示了

// N1、通常情况下会将类型文件单独抽取为独立的文件，后续在使用时直接按需导入，此处为了方便理解便没有抽取
