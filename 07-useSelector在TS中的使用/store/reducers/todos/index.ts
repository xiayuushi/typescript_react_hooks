export type XxxStateType = {
  id: number,
  name: string,
  done: boolean
}[]

const initState: XxxStateType = [
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


const todosReducer = (state = initState, action: any) => {
  return state
}

export default todosReducer

// st1、定义state初始值的TS类型（需要根据接口文档返回的服务器数据格式进行定义）
// st2、对当前模块的reducer的state赋初始值（并用上定义好的TS类型）
