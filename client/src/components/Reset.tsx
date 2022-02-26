import { Form, Checkbox } from 'antd';
import Button from './reusables/Button';
import React from 'react';
import Input from './reusables/Input';
import Navbar from './reusables/Navbar'
import { connect, Provider } from 'react-redux';
import AvatarSelector from './AvatarSelector';
import { login, register } from '../actions/auth'
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { setAlert } from '../actions/alert';
import F04 from './404';
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import Container from './reusables/Container';
const mapStateToProps = (state: any) => {

    return ({ state: state })
}
const mapDispatchToProps = (dispatch: any) => {

    return ({
        onLogin: (event: any) => {
            login(dispatch, event);
        },
        onAlert: (event: any) => {
            setAlert(event.msg, event.type, dispatch);
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

const Register = (props: any) => {
    const [state, setState] = React.useState({ real: true, initial: false, password: "", remember: true });
    let { id }: any = useParams();
    const check = async () => {

        try {
            await Axios.get(`/api/auth/resetpassword/${id}`);
            setState((state) => ({ ...state, real: true, initial: true }));
        }
        catch {
            setState((state) => ({ ...state, real: false, initial: true }));
        }
    }
    if (state.initial === false) {
        console.log('Initial Load');

        check();
    }
    const onChange = (e: any) => {
        console.log(e.target)
        if (e.target) {
            let modifications: any = {};
            modifications[e.target.name] = e.target.value;
            setState((state: any) => ({ ...state, ...modifications }));
        }
    }
    const onFinish = async (e: any) => {
        try {
            e.preventDefault();
            const reset = await Axios.post(`/api/auth/resetpassword/${id}`, { password: state.password })
            await props.onLogin({ email: reset.data.email, password: state.password, remember: state.remember });
            props.onAlert({ msg: 'Your Password Has Been Reset, and you are now logged in!' });
            // window.location.href = '/';
            props.history('/')
        }
        catch (e) {
            props.onAlert({ msg: 'Something Went Wrong', type: 'danger' });
        }
    };


    if (state.real) {

        return (<div className="auth">

            <Helmet>
                <meta charSet="utf-8" />
                <title>Reset Your Password</title>

            </Helmet>
            <Container>Reset Password</Container>


            <form className='auth-form' onSubmit={onFinish}>
                <Input placeholder="New Password" type="password" name="password" value={state.password} onChange={onChange} />

                <div className="auth-checkbox">
                    <label htmlFor="checkbox"><p className="auth-checkbox-label">Remember me</p></label>
                    <input id="checkbox" checked={state.remember} className="auth-checkbox-input" name="remember" type="checkbox" onChange={onChange} />
                </div>

                <div className="auth-btn">
                    <Button>
                        SUBMIT
                    </Button>
                </div>
            </form></div>
        );
    }
    else {
        return (<div> <F04></F04></div>)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register))