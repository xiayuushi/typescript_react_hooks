import React from 'react'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Profile from './pages/Profile'
import { BrowserRouter as Router, NavLink, Route, Switch } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="link-wrap">
          <NavLink to="/home">首页</NavLink>
          <NavLink to="/detail">详情页</NavLink>
          <NavLink to="/profile">个人中心页</NavLink>
        </div>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/detail" component={Detail} />
          <Route path="/profile" render={() => (<Profile></Profile>)} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
