import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom'
import Button from './reusables/Button';
import axios from 'axios'

import SubPost from './reusables/subPost';
import { Card } from 'antd';

import Container from './reusables/Container';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Helmet } from 'react-helmet';
const { Meta } = Card;
export default (props: any) => {
    // console.log(props.state.user.user)
    const icon = props.state.user.user.image[0];
    // console.log(icon);
    const [Posts, setPosts]: any = React.useState([]);
    const posts = async () => {
        try {
            const po: any = await axios.get('/api/post')
            const p = po
            console.log(p.data)
            setPosts(p.data.msg);
            return (p.data.msg);
        }
        catch (e) {
            console.log(e.response);
            setPosts(null);


        }
    }
    if (Posts !== null) {
        if (Posts.length < 1) {
            posts();

        }


    }


    console.log(Posts);
    return (
        <div className="profile">
            <Container className="profile-header" textClassName="profile-header-inner">
                <img className="profile-header-image" src={icon}></img>
                <h1 className="profile-header-name">{props.state.user.user.userName}</h1>
            </Container>

            <Helmet>
                <meta charSet="utf-8" />
                <title>My Profile</title>
            </Helmet>


            {Posts ? <div className='posts'>
                <h1 className='posts-title'>
                    Your Posts
                </h1>
                <div className='posts-container'>
                    {Posts.map((post: any) => {
                        const link = 'posts/' + post._id;
                        return (<SubPost img={post.images[0]} _id={post._id} title={post.title} description={post.description} user={post.user} />)

                    })}
                </div>

            </div> : <h2 style={{ fontSize: '100%' }}>You haven't made any posts yet</h2>}
         


        </div>)

}