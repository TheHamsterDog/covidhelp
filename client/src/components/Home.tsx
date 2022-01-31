import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet';

const { Search } = Input;
const Home = (props: any) => {
  return (<div> <div className='landing-top'>
    <Helmet>
      <meta charSet="utf-8" />
      <title>CovidHelp</title>
      <meta name="description" content='Covid19 open source Charity'></meta>
      <meta name="keywords" content="covid 19 help people posts covidhelp donation donate charity"></meta>
    </Helmet>
    <div className='landing-title'> <h1>Covid Help!</h1> </div>
    <img className='landing-image' src='/coronavirus.png' />
  </div>
    <div className='landing-description'><h2 >Help people by donating or ask for donations</h2>
      <br />
      <Button type="primary" style={{ width: '50%', marginLeft: '0' }} size='large' >
        <Link to='/post'>Submit a Post</Link>
      </Button>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Search
        style={{ margin: '0% 20%', width: '50%' }}
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={value => window.location.href = '/search/' + value}
      />
    </div>
  </div>)
}
export default Home