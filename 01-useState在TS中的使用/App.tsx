import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {
  // 01、useState()初始值为简单类型时，泛型可传可不传
  const [num, setNum] = useState(0)
  const [count, setCount] = useState<number>(0)
  const [status, setStatus] = useState<boolean>(false)

  // 02、useState()初始值为复杂类型时，泛型必须传入（可根据服务器返回的数据格式定义泛型）
  type T = { id: number, name: string }[]
  const [data, setData] = useState<T>([])
  useEffect(() => {
    const getChannels = async () => {
      const res = await axios.get('http://geek.itheima.net/v1_0/channels')
      setData(res.data.data.channels)
    }
    getChannels()
  }, [])

  return (<div>
    <div className='wrap'>
      <div>常规用法：{num}</div>
      <button onClick={() => setNum(num + 1)}>修改状态</button>
    </div>
    <div className="wrap">
      <div>泛型用法：{count}</div>
      <button onClick={() => setCount(count + 1)}>修改状态</button>
    </div>
    <div className='wrap'>
      <div>泛型用法：{status ? 'true' : 'false'}</div>
      <button onClick={() => setStatus(!status)}>修改状态</button>
    </div>
    <ul className='ul'>
      {
        data.map(item => (
          <li key={item.id} className={item.id % 2 === 0 ? 'pink' : ''}>{item.name}</li>
        ))
      }
    </ul>
  </div>)
}

export default App

// 01、当初始值是简单类型时，TS中useState的泛型参数可传可不传
// 01、A 没传泛型，则会根据TS类型推断去推断泛型的实际类型
// 01、B 如果传了泛型，则初始值必须必须符合泛型的要求

// 02、当初始值是复杂类型时，TS中useState的泛型参数必须传入（例如请求前的空数组，到请求后的有数据数组）
// 02、此时就必须根据服务器接口返回数据的格式，提前定义好泛型参数的类型（可以使用type或者interface定义泛型）
