import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link, useParams } from 'react-router-dom'
import { Button } from 'antd';
import axios from 'axios'
import { Card } from 'antd';
import F404 from './404';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Helmet } from 'react-helmet';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Container from './reusables/Container';

import SubPost from './reusables/subPost';
const Profiles = (props) => {
    // console.log(props.state.user.user)

    // console.log(icon);
    const [state, setState] = React.useState({ posts: [], user: {}, load: true, error: false });
    let { id } = useParams();
    let icon;
    const posts = async () => {

        try {

            const u = await axios.get('/api/user/' + id)
            const po = await axios.get('/api/post/user/' + id)
            const p = po
            // console.log(p.data)
            const user = u.data.msg;
            console.log(user);


            setState({ user: user, posts: [...po.data.msg], load: false })
        }
        catch (e) {
            console.log(e.response);
            setState({ user: null, error: true, load: false });


        }
    }
    // return(<div>Something Big</div>)
    if (state.load) {
        posts()
        console.log(state);

        return (<div style={{ margin: '20% 0' }}><CircularProgress></CircularProgress></div>)


    }
    else {



        if (state.user === null) {
            return (<div style={{ margin: '20% 0' }}><F404 /></div>)
        }
        else {


            return (

                <div className='profile' style={{ textAlign: 'center' }}>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>CovidHelp: {state.user.userName}</title>
                        <meta name="description" content={state.user.userName}></meta>
                        <meta name="keywords" content={state.user.userName + ' ' + state.user.name + ' covid help covidhelp account'}></meta>
                    </Helmet>

                    <Container className="profile-header" textClassName="profile-header-inner">
                        <img className="profile-header-image" src={state.user.image[0]}></img>
                        <h1 className="profile-header-name">{state.user.userName}</h1>
                    </Container>



                    {state.posts.length > 0 ? <div className='posts'>
                        <h1 className='posts-title'>
                            {state.user.userName + '\'s '} Posts
                        </h1>
                        <div className='posts-container'>
                            {state.posts.map((post) => {
                                const link = 'posts/' + post._id;
                                return (<SubPost img={post.images[0]} _id={post._id} title={post.title} description={post.description} user={post.user} />)

                            })}
                        </div>

                    </div> : <h2 style={{ fontSize: '100%' }}>You haven't made any posts yet</h2>}


                </div>

            )

        }
    }
}
export default Profiles