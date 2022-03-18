import React from 'react'
import Home from './pages/Home'
import Detail from './pages/Detail'
import NotFound from './pages/NotFound'
import { BrowserRouter as Router, NavLink, Route, Switch, Redirect } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="link-wrap">
          <NavLink to="/home">首页</NavLink>
          <NavLink to="/detail">详情页</NavLink>
        </div>
        <Switch>
          <Redirect exact from="/" to="/home"></Redirect>
          <Route path="/home" render={() => (<Home></Home>)} />
          <Route path="/detail" exact key='1' component={Detail} />
          <Route path="/detail/:id" key='2' component={Detail} />
          <Route render={() => (<NotFound></NotFound>)}></Route>
        </Switch>
      </div >
    </Router >
  )
}

export default App

// useParams在TS的使用，必须传入泛型参数且泛型参数的key与动态路由中设置的key必须保持一致
// st1、在路由配置中开启动态路由 <route path='/xxx/:id' />
// st2、在传输页组件使用history.push()跳转到目标页时，传入动态路由实际参数（即上面id的实际值）
// st2、例如：const history = useHistory(); history.push('/xxx/123')
// st3、在目标页面使用useParams()并传入泛型参数（泛型参数的key要与动态路由中设置的key保持一致），通过该hoos返回的对象接收动态路由参数
// st3、例如：const params = useParams<{ id: string }>(); 通过params.id就可以拿到123了

// N1、react-router-dom的动态路由参数指的是在path路径'/'后直接以'/'方式拼接的参数，如'/xxx/123'中的123
// N2、react-router-dom的常规路由传参指的是通过history.push()定义第二参数state来传递的参数
// N3、useParams()必须传入泛型参数，且泛型参数的key与动态路由中设置的key必须保持一致，值类型为string
