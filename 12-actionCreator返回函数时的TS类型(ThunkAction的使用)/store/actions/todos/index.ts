import { rootReducerType } from '../../index';
import { ThunkAction } from 'redux-thunk'

// 注意：actionCreator无论是同步或异步依旧需要先定义好action的类型
// 如果，actionCreator如果返回的不是函数，则预先定义好的action类型会直接用作actionCreator的函数返回值类型
// 如果，actionCreator如果返回的是函数，则预先定义好的action类型会当做ThunkAction的第4个泛型参数使用

export type XxxTodosActionType = {
  type: 'ADD_TODOS',
  name: string
} | {
  type: 'DEL_TODOS',
  id: number
} | {
  type: 'CHANGE_TODOS',
  id: number
} | {
  type: 'DELAY_DEL_TODOS',
  id: number
}


// 情况1：actionCreator的返回值不是函数，则返回值类型是自定义的对象联合类型
export const addTodos = (name: string): XxxTodosActionType => {
  return {
    type: 'ADD_TODOS',
    name
  }
}

export const delTodos = (id: number): XxxTodosActionType => {
  return {
    type: 'DEL_TODOS',
    id
  }
}

export const changeTodos = (id: number): XxxTodosActionType => {
  return {
    type: 'CHANGE_TODOS',
    id
  }
}

// 情况2：actionCreator的返回值是函数，则必须使用ThunkAction来作为返回值函数的类型
// actionCreator的函数返回值类型必须是redux-thunk提供的ThunkAction，该类型必须传入4个泛型参数
// 泛型参数1（类型）决定了 actionCreator内返回函数的值类型（内返回函数无返回值则传入void）
// 泛型参数2（类型）决定了 actionCreator内返回函数的第二形参的值类型（对应store.state函数（不要加括号调用），只需传入自己获取的rootReduceType）
// 泛型参数3（类型）决定了 actionCreator内返回函数的第三形参的值类型（如果用不到额外参数，直接定义为any或者unKnown）
// 泛型参数4（类型）决定了 actionCreator内返回函数的第一形参dispatch的预选值的类型（当前action模块的类型，通常会是一个联合类型）
export const delayDelTodos = (id: number): ThunkAction<void, rootReducerType, any, XxxTodosActionType> => {
  return (dispatch, getState) => {
    console.log(getState().todos)

    setTimeout(() => {
      dispatch({
        type: 'DELAY_DEL_TODOS',
        id
      })
    }, 5000)
  }
}

// redux与react-redux在TS项目中操作状态（定义reducer、action、dispatch）的流程
// st1、在各个reducer中，定义state初始值的TS类型（需要根据接口文档返回的服务器数据格式进行定义）
// st2、在各个reducer中，对当前模块的reducer的state赋初始值（并用上定义好的TS类型），第二参数action因为还不清楚逻辑可以先暂定为any类型
// st3、在各个action中，定义actionCreator之前可以先定义当前action模块的TS类型并按需导出（这个类型会在对应的reducer模块中使用到）
// st4、在各个action中，定义actionCreator（会返回各个模块action.type的函数）
// st5、在需要操作redux中管理的状态（数据）的时候，通过react-redux的useDispatch()返回的diapatch对象来提交对应的action.type
// st6、回到该action.type对应的reducer中进行逻辑处理，此时应指定action的TS类型（即，由之前暂定的any类型改为更具体的TS类型，以便在后续的操作中获得TS的类型提示支持）

// 01、定义异步action之前，需要在创建store对象时配置并使用redux-thunk这个中间件
// N2、同步action的TS类型通常是自己根据实际需求定义的联合类型，如此处的XxxActionType
// N3、异步action的TS类型是由用于提交异步action的中间件redux-thunk来提供的（ThunkAction）
// N3、异步action（dispatch函数或者箭头函数）的返回值类型应该由redux-thunk中间件提供（即其内置的ThunkAction类型）
// N4、只要actionCreator返回的是函数（无论同步或者异步）则必须由redux-thunk提供类型，否则由自定义提供类型


// actionCreator返回的是函数则必须由thunk提供类型，否则由自定义提供类型
// T1、只要actionCreator返回的是函数（无论是同步函数或者是异步函数），都会走thunk，此时就必须使用redux-thunk内置的ThunkAction作为函数的返回值类型
// T1、例如： const actionCreator = ():ThunkAction<类型参数1，类型参数2，类型参数3，类型参数4> => { return ()=>{  } }
// T1、或者： const actionCreator = ():ThunkAction<类型参数1，类型参数2，类型参数3，类型参数4> => { return dispatch => { } }
// T2、actionCreator返回的不是函数，（例如对象或者其他数据格式）则不会走thunk，此时就必须自己定义联合类型来作为返回数据的类型
// T2、例如：const actionCreator = ():XxxActionType => { return { type: 'xxx' } }


// 中间件redux-thunk内置的ThunkAction类型，4个泛型参数依次如下
// 类型参数1：ReturnType 用于指定函数的返回值类型  无返回值则是void
// 类型参数2：指定RootState的类型（整体state的类型，即根reducer类型，此处案例中的rootReducerType）
// 类型参数3：指定额外的参数类型，一般为unkonwn或者any
// 类型参数4：用于指定dispatch的Action的类型
// actionCreator返回的是只要是函数（无论同步或者异步）就都会用到其内置的ThunkAction类型


// Q1、异步action（会返回dispatch函数或者匿名箭头函数）如果使用自定义的联合类型作为TS类型会因类型不一致而报错"不能将类型 '(dispatch:any)=>void' 分配给类型'xxx'"
// R1：因为异步action是通过redux-thunk中间件发送请求，因此返回的是一个函数类型，而自定义的通常是对象的联合类型，因此TS类型不一致会报错
// A1：使用redux-thunk内置的TS类型来作为异步action的TS类型
// N1：为了开发效率可以将actionCreator返回的函数暂定为any类型，后续当逻辑测试书写无误后必须再改成redux-thunk的内置ThunkAction类型

// actionCreator返回的是函数时，定义返回函数的返回值值类型ThunkAction的使用流程
// st1、安装redux-thunk，并在创建store实例时配置该中间件
// st2、在action模块中，如果actionCreator返回的是函数，则必须从redux-thunk导出其内置的ThunkAction来作为actionCreator返回函数的返回值类型
// st3、将ThunkAction作为actionCreator返回的函数返回值TS类型来使用
// st4、ThunkAction必须传入4个泛型参数
// st4、例如：const actionCreator = ():ThunkAction<void, rootReducerType, any|unKnown, XxxTodosActionType> => { return (dispatch, getState)=>{ console.log('xxx ') } }
// st4、泛型参数1 ReturnType：它用于指定actionCreator内返回的函数的值类型，例如上面传入泛型参数1为void，则内部函数必须没有返回值
// st4、泛型参数2 State：它用于指定返回函数的可选形参getState的类型，因为该参数获取的是整个store.getState的类型，因此必须传入自己获取的rootReducerType类型
// st4、泛型参数3 ExtraThunkArg：它用于指定额外的可选参数类型，通常如果用不到该参数的话，会指定为any或者unKnown类型
// st4、泛型参数4 BasicAction：它用于指定当前action模块的类型
// 注意：actionCreator返回的函数返回值类型不能指定为自定义的对象联合类型，因为对象联合类型不能指定给函数类型
// 参考：https://redux.js.org/usage/usage-with-typescript#type-checking-redux-thunks
// 另外、泛型参数2的类型，即根reducer的类型获取参考下方


// 根reducer类型获取流程
// 方式1、在store/reducers中（即根reducer模块中）使用泛型工具类ReturnType与typeof操作符获取根reducer对象的返回值，并按需导出到外界
// 方式1、例如：export type TState = ReturnType<typeof rootReducer>
// 方式2、在store/index.ts中使用泛型工具类ReturnType与typeof操作符获取根reducer对象的返回值，并按需导出到外界
// 方式2、例如：export type TState = ReturnType<typeof store.getState>

// 根reducer类型使用场景（如果需要获取整个store对象的状态state，即store.getState()时，就需要该类型）
// 场景1、使用useSelector时
// 场景1、例如：const { 具体某个reducer模块 } = useSelector((state: rootStateType)=> state)
// 场景2、actionCreator返回的是函数时，ThunkAction传入4个泛型参数时，参数2就必须使用到该类型
// 场景2、例如：const actionCreator=():ThunkAction<ReturnType,rootStateType,any|unKnown, xxxActionType>=>{ return (dispatch,getState)=>{} }

// redux-thunk版本使用问题
// 如果使用ThunkAction作为actionCreator的类型，在return函数时，定义action却没有相关提示，可以考虑降为使用redux-thunk@2.3.0版本
// 因为从redux-thunk@2.3.0+以后的版本对于ThunkDispatch的声明中做了修改
// 'A union of the other two overloads for TS inference purposes'这句注释所在的声明被放置到后面导致定义action时没有相关属性提示
