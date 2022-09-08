import React, { useState } from 'react'
import { WindowsFilled, SnippetsFilled, HighlightFilled } from '@ant-design/icons'
import { Breadcrumb, Layout, Menu } from 'antd'
import style from './index.module.scss'

import logo from 'assets/logo.png'
// import { Redicet } from 'App.js'

// import DataBrows from 'pages/DataBrows/index.js'
// import ContenMange from 'pages/contentManage/idnex.js'
// import ArticlePub from 'pages/articlePub/index.js'

// import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
// import { Redicet } from 'App.js'

export default function Index () {
  const { Header, Content, Sider } = Layout

  const location = useLocation()
  const navigate = useNavigate()
  const [navKey] = useState(location.pathname)


  const sliderNav = [
    { label: '数据概览', key: '/home/dataBrows', icon: <WindowsFilled /> },
    { label: '内容管理', key: '/home/contenMange', icon: <SnippetsFilled /> },
    { label: '发布文章', key: '/home/articlePub', icon: <HighlightFilled /> },
  ]
  const item1 = sliderNav.map(item => {
    return {
      key: item.key,
      icon: item.icon,
      label: item.label
    }
  })

  const switchNav = (e) => {
    navigate(e.key)
  }

  return (
    <div className={style.root}>
      <Layout>
        <Header className="header">
          <img src={logo} alt="" />
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={[navKey]}
              style={{
                height: '100%',
                borderRight: 0,
              }}
              items={item1}
              onClick={(e) => { switchNav(e) }}
            />
          </Sider>
          <Layout
            style={{
              padding: '0 24px 24px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >

            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Outlet></Outlet>

            </Content>
          </Layout>
        </Layout>
      </Layout>

    </div>
  )
}
