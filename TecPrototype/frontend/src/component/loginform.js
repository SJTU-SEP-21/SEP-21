import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'


const formItemLayout = {
    labelCol: {
        xs: { span: 16 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
}

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 8
        }
    }
}

class Loginform extends React.Component {

    render() {
        //  debugger;
        return (
            <Form
                {...formItemLayout}
                name='normal_login'
                // initialValues={{ remember: true }}

            >
                <Form.Item
                    label='用户名'
                    name='username'
                    rules={[{ required: true, message: '请输入你的用户名！' }]}
                >
                    <Input
                        prefix={<UserOutlined className='site-form-item-icon' />}
                        placeholder='Username'
                    />
                </Form.Item>
                <Form.Item
                    label='密码'
                    name='password'
                    rules={[{ required: true, message: '请输入你的密码!' }]}
                >
                    <Input
                        prefix={<LockOutlined className='site-form-item-icon' />}
                        type='password'
                        placeholder='Password'
                    />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Form.Item
                        // name='remember'
                        valuePropName='checked'
                        initialValue={true}
                        noStyle
                    >
                        <Checkbox checked>记住我</Checkbox>
                    </Form.Item>

                    <a className='login-form-forgot' href=''>
                        忘记密码
                    </a>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type='primary' htmlType='submit' className='form-button'>
                        登录
                    </Button>
                    Or <Link to='/register'>注册</Link>
                </Form.Item>
            </Form>
        )
    }
}

export default Loginform