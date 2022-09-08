import React, { useEffect, useState } from 'react'
import style from './index.module.scss'
import 'moment/locale/zh-cn'
import locale from 'antd/es/locale/zh_CN'
import {
  Breadcrumb, Card, Form,
  Button,
  Radio,
  Select,
  DatePicker,
  Space, Table
} from 'antd'

import { NavLink } from 'react-router-dom'
const { RangePicker } = DatePicker
export default function Idnex () {

  const [channelList, setChannelList] = useState([])

  const [page, setpage] = useState(1)
  const [formInfo, setformInfo] = useState({})


  const getList = () => {
    React.$apiFun.getChannel().then((res) => {
      setChannelList(res.data.channels)
    })
  }
  const [articleList, setarticleList] = useState({})

  const getArticle = (parmas) => {
    React.$apiFun.getArticle(parmas).then((res) => {
      setarticleList(res.data)
    })
  }

  const changePage = (e) => {
    setpage(e)
    console.log(formInfo)
    getArticle({
      page: page,
      per_page: 10,
      status: formInfo.status === -1 ? '' : formInfo.status,
      channel_id: formInfo.channel ? formInfo.channel : "",
      begin_pubdate: formInfo.date && formInfo.date[0].format('YYYY-MM-DD HH:mm:ss'),
      end_pubdate: formInfo.date && formInfo.date[1].format('YYYY-MM-DD HH:mm:ss')
    })
  }


  useEffect(() => {
    getList()
    getArticle()
  }, [])

  const onFinish = (e) => {
    setformInfo(e)
    getArticle({
      status: e.status === -1 ? '' : e.status,
      channel_id: e.channel && e.channel,
      begin_pubdate: e.date && e.date[0].startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      end_pubdate: e.date && e.date[1].endOf('day').format('YYYY-MM-DD HH:mm:ss')
    })

  }


  const columns = [
    {
      title: '封面',
      dataIndex: 'pic',

      render: (text) => 22,
    },
    {
      title: '标题',
      dataIndex: 'title',

    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => {
        if (status === 1) {
          return '待审核'
        } else if (status === 2) {
          return '审核通过'
        } else if (status === 3) {
          return '审核失败'
        } else if (status === 0) {
          return '草稿'
        }
      },

    },
    {
      title: '日期',
      dataIndex: 'pubdate',

    },
    {
      title: '阅读数',
      dataIndex: 'read_count',

    },
    {
      title: '点赞数',
      dataIndex: 'like_count',

    },

    {
      title: '操作',
      dataIndex: 'aa',
    },
  ]
  const data = articleList.results


  return (
    <div className={style.root}>
      <Card title={
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to='/home/dataBrows'>首页</NavLink>
          </Breadcrumb.Item>
          <Breadcrumb.Item>内容管理</Breadcrumb.Item>
        </Breadcrumb>

      } >
        <Form
          // labelCol={{
          //   span: 4,
          // }}
          onFinish={(e) => { onFinish(e) }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            status: -1
          }}

        >

          <Form.Item label="状态" name='status' value={-1}>
            <Radio.Group >
              <Radio value={-1} defaultChecked> 全部 </Radio>
              <Radio value={0}> 草稿 </Radio>
              <Radio value={1}> 待审核</Radio>
              <Radio value={2}> 审核通过 </Radio>
              <Radio value={3}> 审核失败 </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" style={{ width: '200px' }} name='channel' >
            <Select placeholder='请选择'>
              {/* <Select.Option value="demo">Demo</Select.Option> */}
              {
                channelList.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item label="日期" name='date'>
            <RangePicker locale={locale} />
          </Form.Item>

          <Form.Item  >
            <Space>
              <Button type="primary" htmlType="submit">筛选</Button>
            </Space>
          </Form.Item>

        </Form>
      </Card>

      <Card title={
        <Breadcrumb>
          <Breadcrumb.Item>共找到{articleList.total_count}条符合条件的数据</Breadcrumb.Item>
        </Breadcrumb>
      } >
        <Table columns={columns} dataSource={data} pagination={{
          position: ['bottomCenter'],
          showSizeChanger: true,
          total: articleList.total_count,
          current: page,
          pageSizeOptions: [10, 20, 50, 100],
          onChange: changePage
        }} />;
      </Card>

    </div >
  )
}
