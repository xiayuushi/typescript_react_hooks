import React from 'react'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const history = useHistory()
  return (
    <div className='home-container'>
      <h1>Home</h1>
      <button onClick={() => history.push('/detail/123')}>去详情页方式1</button>
      <button onClick={() => history.push({ pathname: '/detail/456' })}>去详情页方式2</button>
    </div>
  )
}

export default Home

// useParams在TS的使用，必须传入泛型参数且泛型参数的key与动态路由中设置的key必须保持一致
// st1、在路由配置中开启动态路由 <route path='/xxx/:id' />
// st2、在传输页组件使用history.push()跳转到目标页时，传入动态路由实际参数（即上面id的实际值）
// st2、例如：const history = useHistory(); history.push('/xxx/123')
// st3、在目标页面使用useParams()并传入泛型参数（泛型参数的key要与动态路由中设置的key保持一致），通过该hoos返回的对象接收动态路由参数
// st3、例如：const params = useParams<{ id: string }>(); 通过params.id就可以拿到123了

// N1、react-router-dom的动态路由参数指的是在path路径'/'后直接以'/'方式拼接的参数，如'/xxx/123'中的123
// N2、react-router-dom的常规路由传参指的是通过history.push()定义第二参数state来传递的参数
// N3、useParams()必须传入泛型参数，且泛型参数的key与动态路由中设置的key必须保持一致，值类型为string
