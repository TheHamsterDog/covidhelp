import React from 'react';
import Navbar from './reusables/Navbar'
import Input from './reusables/Input';
import axios from 'axios';
import { connect, Provider } from 'react-redux';
import { login } from '../actions/auth'
// import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Container from './reusables/Container';
import Button from './reusables/Button';

const Login = (props: any) => {
  const ForgotPassword = async (email: string) => {
    await axios.post('/api/auth/forgotpassword', { email: email })
  }
  const [state, setState]: [any, any] = React.useState({
    email: "",
    password: "",
    remember: true,

  })
  const onFinish = (e: any) => {

    props.onLogin(state)
  };
  const onChange = (e: any) => {
    console.log(e.target)
    if (e.target) {
      let modifications: any = {};
      modifications[e.target.name] = e.target.value;
      setState((state: any) => ({ ...state, ...modifications }));
    }
  }


  return (<div className="auth" >
    <Container> login</Container>


    <form
      className='auth-form'
      onSubmit={onFinish}
    >
      <Input placeholder="Email" type="email" name="email" value={state.email} onChange={onChange} />
      <Input placeholder="Password" type="password" name="password" value={state.password} onChange={onChange} />
      <div className="auth-checkbox">

        <label htmlFor="checkbox"><p className="auth-checkbox-label">Remember me</p></label>
        <input id="checkbox" className="auth-checkbox-input" name="remember" type="checkbox" value={state.remember} onChange={onChange} />
      </div>
      <Button>Login</Button>
      <Link to='/forgot-password'>ForgotPassword?</Link>
    </form>
  </div>

  );
};
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
export default connect(mapStateToProps, mapDispatchToProps)(Login)