import React from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const history = useHistory()
  return (
    <div className='home-container'>
      <h1>Home</h1>
      <button onClick={() => history.push('/detail', { aa: 'aaa1', bb: 'bbb1' })}>去详情页方式1</button>
      <button onClick={() => history.push({ pathname: '/detail', state: { aa: 'aaa2', bb: 'bbb2' } })}>去详情页方式2</button>
    </div>
  )
}

export default Home
