import React from 'react'
import { useHistory } from 'react-router-dom'

const Profile = () => {
  // useHistory传入泛型参数时，该hook返回的对象调用push()时第二参数必须与泛型中的key一致
  // 可在location对象中获取到push()第二参数携带过来的参数
  const history = useHistory<{ from: string }>()
  return (
    <div className='profile-container'>
      <h1>Profile</h1>
      <button onClick={() => history.push('/detail', { from: 'xxx1' })}>带参数去详情页方式1</button>
      <button onClick={() => history.push({ pathname: '/detail', state: { from: 'xxx2' } })}>带参数去详情页方式2</button>
    </div>
  )
}

export default Profile


// useHistory可以传入泛型参数，也可以不传泛型参数
// 01、useHistory不传泛型参数时与JS中的使用方式一样，该hook返回的对象调用push()第二参数可以传递任意数据
// 01、useHistory不传泛型参数，则可以随意传参
// 01、例如  const history = useHistory(); history.push('/xxx', { aa: 'aaa', bb:'bbb' })
// 02、useHistory可传入对象类型的泛型参数，此时该hook返回的对象调用push()第二参数则必须与泛型中的对象类型中的key对应上
// 02、useHistory加了泛型参数，则必须根据泛型参数指定的key传递正确类型的参数值，相当于加了限制，但好处是有了更明确的提示
// 02、例如 const history = useHistory<{ from: string }>(); history.push('/xxx', { from: 'aaa' })

// useHistory返回的对象调用push()有两种方式
// 方式1：const history = useHistory(); history.push('/xxx', { key: value })
// 方式2：const history = useHistory(); history.push({ pathname:'/xxx', state: { key: value } })
