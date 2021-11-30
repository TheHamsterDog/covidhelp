import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import Navbar from './reusables/Navbar'
import axios from 'axios';
import { connect, Provider } from 'react-redux';
import { login } from '../actions/auth'
import { Link } from 'react-router-dom';
const mapStateToProps = (state: any) => {
  return ({ state: state })
}
const mapDispatchToProps = (dispatch: any) => {

  return ({
    onLogin: (event: any) => {
      login(dispatch, event);
    }
  })
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = (props: any) => {
  const ForgotPassword = async (email: string) => {
    await axios.post('/api/auth/forgotpassword', { email: email })
  }
  const onFinish = (values: any) => {
    props.onLogin(values)
  };

  const onFinishFailed = (errorInfo: any) => {

  };

  return (<div>
    <div className='landing-top'>

      <div className='login-title'> <h1>Login!</h1> </div>
    </div>
    <div className='landing-description'>
      <div className='login-form'>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <div className='form-button'>
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" block>
                Submit
        </Button>
        <Link to='/forgot-password'>ForgotPassword?</Link>
            </Form.Item>
          </div>
        </Form>
        
      </div></div>  </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)