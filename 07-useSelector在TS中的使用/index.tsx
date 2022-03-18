import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// Q1、报错：'除非提供了--jsx标志，否则无法使用JSX'
// A1、解决：将TS配置文件tsconfig.json配置中的"jsx": "react-jsx"改为react后，再重启vscode

// Q2、报错：“React”是指UMD全局，但当前文件是一个模块
// Q2、解决：将TS配置文件tsconfig.json配置中的"jsx": "react-jsx"改为react后，必须在每个使用JSX的组件中导入react