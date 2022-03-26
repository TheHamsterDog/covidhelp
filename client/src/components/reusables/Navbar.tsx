import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Slider } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { withRouter } from "react-router-dom"

import { connect } from 'react-redux';
const { SubMenu } = Menu;
type Props = {
  state: any
}

const mapStateToProps = (state: any) => {
  return ({ state: state })
}
class App extends React.Component<Props> {
  state = {
    current: '',
    redirect: false,
    path: '',
  };

  handleClick = (e: any) => {
    if (e.key === '/logout') {
      localStorage.removeItem('token');
      window.location.reload()
    }
    else {
      window.location.assign(e.key);
    }

  };
  constructor(props: any) {
    super(props);
  }

  render() {
    const { current } = this.state;
    let image: any;
    if (this.props.state?.isLoaded === true) {
      image = this.props.state.user.user.image[0];
      console.log(image);
    }



    return (
      <>
        <div className="navbar-fake">

        </div>
        <Menu className="navbar" style={{ textAlign: 'left' }} onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
          <h1 className="navbar-logo" onClick={() => {
            (this.props as any).history.push('/');
          }}>
            CovidHelp
          </h1>
          <Menu.Item key="/posts" icon={<MailOutlined />}>
            posts
          </Menu.Item>

          {this.props.state?.isLoaded ? <SubMenu key="SubMenu" className="navbar-options" icon={<img src={image} width="35px" style={{ borderRadius: '100%' }}></img>}>

            <Menu.Item className="navbar-options" key="/logout">Log Out</Menu.Item>
            <Menu.Item className="navbar-options" key="/post">Post</Menu.Item>
            <Menu.Item className="navbar-options" key="/edit-profile">Edit Profile</Menu.Item>
            <Menu.Item className="navbar-options" key="/profile">My profile</Menu.Item>

          </SubMenu> : <SubMenu key="SubMenu" className="navbar-sub" title="Login/Register" icon={<SettingOutlined />}>

            <Menu.Item className="navbar-options" key="/register">Register</Menu.Item>
            <Menu.Item className="navbar-options" key="/login">Login</Menu.Item>

          </SubMenu>}
        </Menu>
      </>
    );
  }
}
export default connect(mapStateToProps)(withRouter(App as any) as any);
