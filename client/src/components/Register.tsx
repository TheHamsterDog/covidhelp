import Input from './reusables/Input'
import React from 'react';
import Navbar from './reusables/Navbar'
import { Helmet } from 'react-helmet';
import { connect, Provider } from 'react-redux';
import AvatarSelector from './AvatarSelector';
import { register } from '../actions/auth'
import Container from './reusables/Container';
import Button from './reusables/Button';
const mapStateToProps = (state: any) => {
  return ({ state: state })
}
const mapDispatchToProps = (dispatch: any) => {

  return ({
    onRegister: (event: any) => {
      register(dispatch, event);
    }
  })
}
const Register = (props: any) => {
  const [state, setState]: any = React.useState({ submit: false, name: "", email: "", password: "", remember: true, edit:false })
  const onFinish = (e: any) => {
    e.preventDefault();
    setState((state: any) => ({ ...state, submit: true }));

  };
  const onChange = (e: any) => {
    console.log(e.target)
    if (e.target) {
      let modifications: any = {};
      modifications[e.target.name] = e.target.value;
      setState((state: any) => ({ ...state, ...modifications }));
    }
  }



  return (<div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Make a new account</title>
      <meta name="description" content='Make a new covidHelp account'></meta>
      <meta name="keywords" content="make new covid help covidhelp account"></meta>
    </Helmet>
    <Container> Sign up</Container>

    <div className="auth" >
      <form
        className='auth-form'
        onSubmit={onFinish}
      >
        <Input placeholder="Name" type="text" name="name" value={state.name} onChange={onChange} />

        <Input placeholder="Email" type="email" name="email" value={state.email} onChange={onChange} />
        <AvatarSelector onRegister={props.onRegister} state={state} ></AvatarSelector>
        <Input placeholder="Password" type="Password" name="password" value={state.password} onChange={onChange} />
        <div className="auth-checkbox">
          <label htmlFor="checkbox"><p className="auth-checkbox-label">Remember me</p></label>
          <input id="checkbox" className="auth-checkbox-input" name="remember" type="checkbox" checked={state.remember} onChange={onChange} />
        </div>
        <div className="auth-btn">
          <Button htmlType="submit">Sign Up</Button>
        </div>

      </form></div></div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Register)