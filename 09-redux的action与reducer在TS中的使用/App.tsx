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
