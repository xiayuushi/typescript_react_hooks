import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { rootReducerType } from '../../store'
import { delTodos, addTodos, changeTodos } from '../../store/actions/todos'

const Home = () => {
  const dispatch = useDispatch()
  const { todos } = useSelector((state: rootReducerType) => state)

  const [name, setName] = useState('')
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      dispatch(addTodos(name))
      setName('')
    }
  }

  return (
    <div className='home-container'>
      <input
        type="text"
        className="input"
        placeholder="请输入待定事项"
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyUp={onKeyUp}
      />
      <ul>

        {
          todos.map(v => (
            <li className={['todos-item'].join(' ')} key={v.id}>
              <span className={v.done ? 'complete' : ''} onClick={() => dispatch(changeTodos(v.id))}>{v.name}</span>
              <div onClick={() => dispatch(delTodos(v.id))}>删除</div>
            </li>)
          )
        }
      </ul>
    </div>
  )
}

export default Home
