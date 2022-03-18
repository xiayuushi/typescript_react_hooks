import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { rootReducerType } from '../../store'
import { delTodos } from '../../store/actions/todos'

const Home = () => {
  const { todos } = useSelector((state: rootReducerType) => state)
  const dispatch = useDispatch()

  return (
    <div className='home-container'>
      <input type="text" className="input" placeholder="请输入待定事项" />
      <ul>

        {
          todos.map(v => (
            <li className={['todos-item'].join(' ')} key={v.id}>
              <span className={v.done ? 'complete' : ''}>{v.name}</span>
              <div onClick={() => dispatch(delTodos(v.id))}>删除</div>
            </li>)
          )
        }
      </ul>
    </div>
  )
}

export default Home
