import React from 'react'
import { useHistory } from 'react-router-dom'

// 导入类型声明文件时不要带'.d.ts'的文件后缀名
import { T } from '../../types/index'

const Profile = () => {
  // useHistory传入泛型参数时，该hook返回的对象调用push()时第二参数必须与泛型中的key一致
  // 可在location对象中获取到history.push()第二参数携带过来的参数
  const history = useHistory<T>()
  return (
    <div className='profile-container'>
      <h1>Profile</h1>
      <button onClick={() => history.push('/detail', { from: 'xxx1' })}>带参数去详情页方式1</button>
      <button onClick={() => history.push({ pathname: '/detail', state: { from: 'xxx2' } })}>带参数去详情页方式2</button>
    </div>
  )
}

export default Profile
