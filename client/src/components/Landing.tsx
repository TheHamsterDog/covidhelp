import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';
import Search from './reusables/Search';
const Home = (props: any) => {
  return (<div className="home">
    <Helmet>
      <meta charSet="utf-8" />
      <title>CovidHelp</title>
      <meta name="description" content='Covid19 open source Charity'></meta>
      <meta name="keywords" content="covid 19 help people posts covidhelp donation donate charity"></meta>
    </Helmet>

    <Search />

    <div className='landing-description'><h2 >Help people by donating or ask for donations</h2>
      <br />
      <Button type="primary" style={{ width: '20%', marginLeft: '5%' }} >
        <Link to='/login'>  Log in </Link>
      </Button>
      <Button style={{ width: '20%', marginLeft: '5%' }} type="dashed">
        <Link to='/register'>   Sign Up </Link>
      </Button>
    </div>  <Helmet>
      <meta charSet="utf-8" />
      <title>CovidHelp</title>
      <meta name="description" content='Covid19 open source Charity'></meta>
      <meta name="keywords" content="covid 19 help people posts covidhelp donation donate charity"></meta>
    </Helmet>


  </div>)
}
export default Home
