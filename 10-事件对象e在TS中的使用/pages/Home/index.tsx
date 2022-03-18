import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { rootReducerType } from '../../store'
import { delTodos, addTodos } from '../../store/actions/todos'

const Home = () => {
  const dispatch = useDispatch()
  const { todos } = useSelector((state: rootReducerType) => state)

  const [name, setName] = useState('')
  // 情况2：非行内事件中使用到了事件对象e，则必须为事件对象e指定具体的TS类型，否则TS不会有相关属性提示
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
        // 情况1：行内事件中使用到了事件对象e，无需为事件对象e指定TS类型
        onChange={e => setName(e.target.value)}
        onKeyUp={onKeyUp}
      />
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

// 如何准确的获取事件对象e的TS类型

// 情况1：行内事件中获取
// 步骤1：直接在行内定义事件，无需对事件对象e指定TS类型，可以直接有相关的事件对象属性的提示
// 例如：<input onChange={e=>console.log(e.target.value)} />

// 情况2：非行内事件中获取
// 步骤1：可以先在行内事件中输入'e=>'
// 步骤2：然后将光标移入到形参e中，此时就会显示该元素的TS事件对象类型，复制出现的事件对象类型
// 步骤3：粘贴到事件处理函数的形参e的类型处，后续就会有e的相关属性提示了
// 例如：const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{ console.log(e.target.value) }