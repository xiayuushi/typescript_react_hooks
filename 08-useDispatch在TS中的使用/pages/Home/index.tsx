import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { rootReducerType } from '../../store'

const Home = () => {
  const { todos } = useSelector((state: rootReducerType) => state)
  const dispatch = useDispatch()
  // dispatch()内传入actionCreator函数（该函数会返回一个action.type）

  return (
    <div className='home-container'>
      <input type="text" className="input" placeholder="请输入待定事项" />
      <ul>

        {
          todos.map(v => (
            <li className={['todos-item'].join(' ')} key={v.id}>
              <span className={v.done ? 'complete' : ''}>{v.name}</span>
              <div>删除</div>
            </li>)
          )
        }
      </ul>
    </div>
  )
}

export default Home

// useDispatch在TS的使用与JS完全一样，可以无需为该hook提供泛型参数

// useDispatch在TS的使用参考
// https://redux.js.org/usage/usage-with-typescript#typing-the-useselector-hook
// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types

