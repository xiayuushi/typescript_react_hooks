import React from 'react'
import { useSelector } from 'react-redux'

// 根reducer模块（综合了所有reducer模块的对象）的TS类型
import { rootReducerType } from '../../store'

const Home = () => {
  // 对useSelector第一参数回调的第一参数state使用根reducer模块的TS类型
  const { todos } = useSelector((state: rootReducerType) => state)

  return (
    <div className='home-container'>
      {
        todos.map(v => (<div className={['todos-item', v.done ? 'complete' : ''].join(' ')} key={v.id}>{v.name}</div>))
      }
    </div>
  )
}

export default Home

// useSelector在TS的使用流程
// st1A、在store/reducers中（即根reducer模块中）使用泛型工具类ReturnType与typeof操作符获取根reducer对象的返回值，并按需导出到外界
// st1A、例如：export type TState = ReturnType<typeof rootReducer>
// st1B、在store/index.ts中使用泛型工具类ReturnType与typeof操作符获取根reducer对象的返回值，并按需导出到外界
// st1B、例如：export type TState = ReturnType<typeof store.getState>
// st2、在使用react-redux的useSelector()时，传入TState
// st2、例如：const { 某一个具体的reducer模块对象 } = useSelector((state: TState)=> state) //泛型传参方式1（推荐）
// st2、例如：const { 某一个具体的reducer模块对象 } = useSelector<TState>((state: TState)=> state) //泛型传参方式2
// st3、后续拿到自己所需reducer模块的数据进行渲染即可
// 注意：以上st1中A或者B任性一种方式，获取根rootReducer的返回值的TS类型

// N1、useSelector在TS中使用如不传入泛型参数也能使用，但是却没有TS相应的属性或者方法提示
// N2、useSelector在TS中使用必须传入泛型参数，且泛型参数必须是综合了所有Reducer模块的rootReducer对象的返回值类型
// N3、export type TState = ReturnType<typeof store.getState>，其中此处'store.getState'千万不要加括号调用
// N3、因为调用后拿到的是值，而typeof需要获取的是函数的返回值的类型，而ReturnType接收的泛型参数也必须是类型（而不是值）


// useSelector()的泛型参数
// 查看其内置的TS类型声明，可知它有两个泛型参数
// 泛型参数1 Tstate，与该hook函数第一参数回调的第一形参state的泛型是一样的
// 泛型参数2 TSelected，与该hook函数返回值泛型是一样的，且函数的回调第一参数state的返回值类型也是TSelected
// 因此，useSelector()传入泛型也有两种方式
// 方式1：为useSelector()整体传入泛型：例如 const { 某个reducer模块 } = useSelector<TState, TSelected>((state:Tstate) => state)
// 方式2：将泛型参数1用于useSelector()内的回调的参数1，即用于作为state的TS类型，例如：const { 某个reducer模块 } = useSelector((state:TState) => state)


// useSelector()泛型参数如何获取
// useSelector()第一参数是一个回调，该回调第一形参state是综合了所有reducer模块的对象
// Q：各个reducer模块的state又可能数据格式完全不同，因此在为useSelector()定义第一个泛型参数TState遇到了困难
// A：借助于TS的泛型工具类 ReturnType<> 以及 typeof操作符 可以获取根reducer（即综合了所有reducer模块的对象）的类型
// st1、typeof 可以通过数据具体的属性来逆向得到数据的TS类型
// st1：例如 function add(n1:number,n2:number):number{return n1+n2} type Xxx = typeof xxx; //此时得到的TS类型是 type Xxx = (n1:number, n2:number):number
// st2、ReturnType<> 可以获取函数或者对象的返回值类型（需要传入整体对象的类型，即上面typoof获得的类型）
// st2: 最终 ReturnType<typeof add> 就能够获得黑色add的返回值类型 number类型

// 同理，（方式1）可以在根rootReducer模块中使用 `ReturnType<typeof 根rootReducer>`来获取useSelector的第一泛型TState
// 因此，在根rootReducer模块中可以将获取的rootReducer的返回值TS类型按需导出到外界，后续在使用useSelector()的时候就能够使用该泛型
// 例如：// store/reducers/ -->  type TState = ReturnType<typeof rootReducer>

// 或者，（方式2）可以在store对象中使用 `ReturnType<typeof store.getState>`来获取useSelector的第一泛型TState
// 例如：// store/index.ts/ -->  type TState = ReturnType<typeof store.getState>

// 使用：const { 某个reducer模块 } = useSelector((state: TState)=> state) //方式1 ES6解构
// 使用：const xxx = useSelector((state: TState)=> state.某个具体的reducer模块) //方式2 常规使用

// useSelector泛型参数获取参考
// https://redux.js.org/usage/usage-with-typescript#typing-the-useselector-hook
// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types

