import React, { useState } from 'react'
import style from './index.module.scss'
import { Card, Button, Checkbox, Form, Input, message } from 'antd'
import { setToken } from 'utils/storage.js'
import { useNavigate } from 'react-router-dom'

import logo from 'assets/logo.png'
export default function Index () {
  const navigator = useNavigate()
  const [loadings, setLoadings] = useState(false)

  const subMit = (e) => {
    // console.log(React) 
    setLoadings(true)
    React.$apiFun.login({
      mobile: e.mobile,
      code: e.code
    }).then(res => {
      setToken(res.data.token)
      message.success('登录成功')
      setTimeout(() => {
        navigator('/home/dataBrows')
      }, 1000)
    })
  }
  return (
    <div className={style.root}>
      <Card className="loginContainer">
        <img className='logoImg' src={logo} alt="" />


        <Form
          name="basic"
          onFinish={(e) => subMit(e)}

          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            terms: false,
            mobile: "13911111111",
            code: '246810'
          }}

          validateTrigger={['onBlur', 'onChange']}
        >
          <Form.Item
            label="手机号"
            name="mobile"
            rules={[
              {
                required: true,
                message: '请输入手机号',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号码格式不对',
                validateTrigger: 'onBlur'
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="验证码"
            name="code"

            rules={[
              {
                required: true,
                message: '请输入验证码',
              },
              {
                len: 6,
                message: '验证码6个字符', validateTrigger: 'onBlur'
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="terms"
            valuePropName="checked"
            rules={[
              {
                validator: (rule, value) => value ? Promise.resolve() : Promise.reject('请阅读协议')
              }

            ]}
          >
            <Checkbox> 我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
          </Form.Item>

          <Form.Item
          >
            <Button type="primary"
              loading={loadings}
              htmlType="submit" block>
              登录
            </Button>

          </Form.Item>
        </Form>
      </Card>
    </div >
  )
}
