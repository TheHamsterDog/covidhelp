import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Card } from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Helmet } from "react-helmet";
import { Input } from 'antd';
import { Col, Row } from 'react-grid-system';
import Search from './reusables/Search';

import SubPost from './reusables/subPost';
const { Meta } = Card;
const Posts = (props: any): JSX.Element => {
    let loadingRef: any = React.createRef();




    // document.body.style.overflowY='scroll'



    const [state, setState]: any = React.useState({ keepLoading: true, posts: [], initialLoad: false });
    const RequestForMore: Function = async (to: number, from: number) => {
        let posts: any = await axios.post('/api/post/infinite', { from: from, to: to });
        if (posts.data.msg.length === 0) {

        }
        else {

            if (posts.data.msg.length === 8) {
                keepLoading = true;
                setState({ ...state, posts: [...state.posts, ...posts.data.msg], initialLoad: true })
            }
            else {
                setState({ ...state, posts: [...state.posts, ...posts.data.msg], initialLoad: true, keepLoading: false })
            }

        }

    }

    let keepLoading = true;
    if (state.keepLoading === false) {
        keepLoading = false;
    }
    const onScroll = () => {
        if (state.keepLoading) {
            if (keepLoading) {

                console.log('actually loading');

                keepLoading = false;
                RequestForMore(state.posts.length + 8, state.posts.length)

            }
        };
    }
    const paneDidMount = (node: any) => {
        if (node) {
            console.log('hey there');
            console.log(node);

            node.addEventListener("scroll", onScroll, true);

        }
    }


    if (state.posts.length === 0) {
        RequestForMore(8, 0);
    }

    let index = 0;
    if (state.initialLoad) {
        return (<div className='app'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>CovidHelp: Posts</title>
                <meta name="description" content='Latest CovidHelp Posts'></meta>
                <meta name="keywords" content="covid 19 help people posts covidhelp donation donate charity"></meta>
            </Helmet>

            <Search />



            <InfiniteScroll
                dataLength={state.posts.length}
                next={() => onScroll()}
                hasMore={state.keepLoading}
                loader={<div style={{ marginTop: '10%', marginBottom: '10%', marginRight: '40%' }}><CircularProgress /></div>}


                refreshFunction={() => { setState({ keepLoading: true, posts: [], initialLoad: false }) }}
                pullDownToRefresh
                pullDownToRefreshThreshold={50}
                pullDownToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                }
                releaseToRefreshContent={
                    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                }
            ><div className='posts'>
                    <h1 className='posts-title'>
                        Recent Posts
                    </h1>
                    <div className='posts-container'>
                        {state.posts.map((post: any) => {
                            return (<SubPost img={post.images[0]} _id={post._id} title={post.title} description={post.description} user={post.user} />)
                        })}
                    </div>

                </div>
            </InfiniteScroll>


            {/* {state.keepLoading ? <div ref={paneDidMount} className='end' style={{ margin: '10% 0%' }} onWheel={() => {
                    console.log('hey');
                }
                } onScroll={() => console.log('scrolled')}><CircularProgress /></div> : null} */}
        </div>)

    }
    else {
        return (<div style={{ margin: '20% 0%' }}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>CovidHelp: Posts</title>
                <meta name="description" content='Latest CovidHelp Posts'></meta>
                <meta name="keywords" content="covid 19 help people posts covidhelp donation donate charity"></meta>
            </Helmet>
            <CircularProgress /></div>)
    }

}
export default Posts;
