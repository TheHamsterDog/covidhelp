import { Form, Checkbox } from 'antd';

import React from 'react';
import Input from './reusables/Input';
import Button from './reusables/Button';
import Navbar from './reusables/Navbar'
import { connect, Provider } from 'react-redux';
import Container from './reusables/Container';
import AvatarSelector from './AvatarSelector';
import { register } from '../actions/auth'
import { Helmet } from 'react-helmet';
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
  // console.log();
  console.log(props.state.user.user.image[0][0]);
  
  const [state, setState]: any = React.useState({ submit: false, edit: true, thumbUrl: props.state.user.user.image[0], name: props.state.user.user.userName, email: props.state.user.user.email, password: "" })
  const onFinish = (e:any) => {
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
  const onFinishFailed = (errorInfo: any) => {

  };

  return (<div className="auth">

    <Helmet>
      <meta charSet="utf-8" />
      <title>Edit Your Profile</title>

    </Helmet>

    <Container>Edit Profile</Container>


    <form
      className='auth-form'
      onSubmit={onFinish}
    >
      <Input placeholder="Name" type="text" name="name" value={state.name} onChange={onChange} />
      <Input placeholder="Email" type="email" name="email" value={state.email} onChange={onChange} />
      <AvatarSelector onRegister={props.onRegister} state={state} ></AvatarSelector>
   
      <div className="auth-btn">
        <Button>
          Submit
        </Button>
      </div>

    </form></div >
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Register)