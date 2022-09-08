import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
// import 'antd/dist/antd.css'
import apiFun from 'api/http.js'
import App from './App'

React.$apiFun = apiFun

// import { HashRouter } from 'react-router-dom'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <App />
)