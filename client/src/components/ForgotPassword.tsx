import { Form, Checkbox } from 'antd';
import Input from './reusables/Input';
import React from 'react';
import Navbar from './reusables/Navbar'
import axios from 'axios';
import { setAlert } from '../actions/alert';
import { connect, Provider } from 'react-redux';
import { login } from '../actions/auth'
import { Helmet } from 'react-helmet';
import Container from './reusables/Container';
import Button from './reusables/Button';
const mapStateToProps = (state: any) => {
  return ({ state: state })
}
const mapDispatchToProps = (dispatch: any) => {

  return ({
    onLogin: (event: any) => {
      login(dispatch, event);
    },
    onAlert: (msg: any, type: any) => {
      setAlert(msg, type, dispatch)
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
  const [state, setState] = React.useState({ email: "" });
  const onFinish = async (e:any) => {
    
    e.preventDefault();
    console.log(e)
    await axios.post('/api/auth/forgotpassword', { email: state.email })
    props.onAlert('If an account with that email exists, we will send information on how you can recover your account', 'warning')
  };

  const onChange = (e: any) => {
    console.log(e.target)
    if (e.target) {
      let modifications: any = {};
      modifications[e.target.name] = e.target.value;
      setState((state: any) => ({ ...state, ...modifications }));
    }
  }


  return (<div className="auth">
    <Helmet>
      <meta charSet="utf-8" />
      <title>Forgot Password</title>

    </Helmet>

    <Container>
      RESET PASSWORD

    </Container>



    <form
      className='auth-form'
      onSubmit={onFinish}
    >

      <Input placeholder="Email" type="email" name="email" value={state.email} onChange={onChange} />


      <div className='auth-btn'>

        <Button >
          Submit
        </Button>

      </div>
    </form>
  </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)