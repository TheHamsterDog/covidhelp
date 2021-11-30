import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Slider } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import {Redirect} from 'react-router-dom'
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
type Props={
state:any
}
class App extends React.Component<Props> {
  state = {
    current:'', 
    redirect:false,
    path:'', 
  };

  handleClick = (e:any) => {
    if(e.key==='/logout'){
      localStorage.removeItem('token');
    window.location.reload()
    }
    else{
      window.location.assign(e.key);
    }
  
  };
  constructor(props:any) {
    super(props);
  }

  render() {
    const { current } = this.state;
    let image:any;
    if(this.props.state.isLoaded===true){

  
 image=this.props.state.user.user.image[0];
console.log(image);


}

  
    
    return (
      <div >
      <Menu  style={{textAlign:'left'}} onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item  key="/" >
        <h3 className='logo'  >Covid Help</h3>
 </Menu.Item>
        <Menu.Item key="/posts" icon={<MailOutlined />}>
       posts
        </Menu.Item>
  
        {this.props.state.isLoaded?   <SubMenu key="SubMenu" icon={<img src={image} width="35px" style={{borderRadius:'100%'}}></img>}>
       
       <Menu.Item key="/logout">Log Out</Menu.Item>
       <Menu.Item key="/post">Post</Menu.Item>
       <Menu.Item key="/edit-profile">Edit Profile</Menu.Item>
       <Menu.Item key="/profile">My profile</Menu.Item>
  
   </SubMenu>  :<SubMenu key="SubMenu" title="Login/Register" icon={<SettingOutlined/>}>
       
       <Menu.Item key="/register">Register</Menu.Item>
       <Menu.Item key="/login">Login</Menu.Item>
  
   </SubMenu>}
      
   
      </Menu>
      </div>
    );
  }
}
export default App;
