import Input from './reusables/Input'
import Button from './reusables/Button';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { login } from '../actions/auth'
import Container from './reusables/Container';
import PicturesWall from './pictureWall';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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

const Login = (props: any) => {
  const [state, setState]: any = React.useState({
    post: { paypal: "", description: "", title: "" }, submit: false,
  })
  const onChange = (e: any) => {
    console.log(e.target)
    if (e.target) {
      let modifications: any = {};
      modifications[e.target.name] = e.target.value;
      setState((state: any) => ({ ...state, post: { ...state.post, ...modifications } }));
    }
  }
  if (props.state.user.user.isVerified) {
    const onFinish = (e:any) => {
      e.preventDefault();
      setState((state: any) => ({ ...state, submit: true }))
    };
    return (<div className="auth">
      <Container>CREATE POST</Container>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Post a new submission</title>
      </Helmet>
      <form className="auth-form" onSubmit={onFinish}>

        <Input placeholder="title" type="text" name="title" value={state.post.title} onChange={onChange} />

        <Input placeholder="description" type="text" name="description" value={state.post.description} onChange={onChange} />
        <Input placeholder="Donation Link" type="text" name="paypal" value={state.post.paypal} onChange={onChange} />

        <PicturesWall state={state} setState={setState}></PicturesWall>
        <div className='auth-btn'>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </div>
      </form></div>
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