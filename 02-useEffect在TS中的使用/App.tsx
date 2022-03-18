import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {
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

// 01、useEffect没有泛型变量，也没有返回值，因此该hook的使用与JS完全一致
// 02、不要直接在useEffect的回调参数中使用async关键字，最好的做法是在回调参数中定义其他函数去使用该关键字