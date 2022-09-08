import React, { useEffect } from 'react'
import { BrowserRouter as MyRoute, Route, Routes, useNavigate } from
  'react-router-dom'

import Index from 'pages/Layout/index.js'
import Login from 'pages/Login/index.js'



import DataBrows from 'pages/DataBrows/index.js'
import ContenMange from 'pages/contentManage/idnex.js'
import ArticlePub from 'pages/articlePub/index.js'
import { getToken } from 'utils/storage.js'
// import Index from 'pages/Login/index.js'
// import MRoute from '@/route/index.js'
// import MRoute from 'route/index.js'

export default function App () {

  return (
    // <div>App</div>
    <MyRoute>
      {/* <NavLink to='/home'>首页</NavLink>
      <NavLink to='/login'>登录</NavLink> */}
      <Routes>
        {/* {MRoute} */}
        <Route path='/home' element={<AuthComponent><Index></Index></AuthComponent>}>
          <Route index path='/home/dataBrows' element={<DataBrows></DataBrows>} ></Route>
          <Route path='/home/contenMange' element={<ContenMange></ContenMange>} ></Route>
          <Route path='/home/articlePub' element={<ArticlePub></ArticlePub>} ></Route>
          <Route path='/home' element={<AuthComponent><DataBrows></DataBrows></AuthComponent>}></Route>
        </Route>

        <Route path='/login' element={<Login></Login>}></Route>

        <Route path='*' element={<AuthComponent><Redicet to='/home'></Redicet></AuthComponent>}></Route>

      </Routes>
    </MyRoute>
  )
}


// 路由拦截
export const AuthComponent = ({ children }) => {
  const login = getToken()
  return login ? children : <Redicet to='/login'></Redicet>
}

// 路由重定向
export const Redicet = ({ to }) => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(to)
  })
  return null
}