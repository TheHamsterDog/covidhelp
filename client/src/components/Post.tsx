import { Form, Input, Button, Checkbox } from 'antd';
import React from 'react';
import Navbar from './reusables/Navbar'
import { connect, Provider } from 'react-redux';
import { login } from '../actions/auth'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import pictureWall from './pictureWall'
import PicturesWall from './pictureWall';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
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



  const [state, setState]: any = React.useState({
    post: {}, submit: false
  })
  if (props.state.user.user.isVerified) {
    const onFinish = (values: any) => {
      setState({ post: values, submit: true })
    };

    const onFinishFailed = (errorInfo: any) => {

    };

    return (<div>
      <div className='landing-top'>

        <div className='login-title'> <h1>Create a Post!</h1> </div>
      </div>
      <Helmet>
                <meta charSet="utf-8" />
        <title>Post a new submission</title>
             
            </Helmet>
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
              label="title"
              name="title"
              rules={[{ required: true, message: 'Please input your title!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="description"
              name="description"
              rules={[{ required: true, message: 'Please input your description!' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="paypal.me"
              name="paypal"
              rules={[{ required: true, message: 'Please input your paypal.me link!', type: 'url' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="image"
            >
              <PicturesWall state={state} setState={setState}></PicturesWall>
            </Form.Item>
            <div className='form-button'>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" block>
                  Submit
        </Button>
              </Form.Item>
            </div>
          </Form></div></div>  </div>
    )
  }
  else {
    return (
      <div><div style={{ margin: '20% 30%' }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Post a new submission</title>

        </Helmet>
        <h1>Your Account Is Not Verified, please verify your account by going to the link that has been mailed to your email id</h1>
        <p style={{ textAlign: "center" }}>

          <Link to="/">Go to Home </Link> <br />
          <Button type="primary" block onClick={async () => await axios.get('/api/auth/resend/' + props.state.user.user._id)}> Resend Email</Button>
          <br />
          <Link to="/post">Refresh</Link>
        </p>
      </div></div>);
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)