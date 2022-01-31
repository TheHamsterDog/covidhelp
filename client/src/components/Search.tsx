import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'
import { Card } from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component';
import F04 from './404';
import { Helmet } from 'react-helmet';
import { Input } from 'antd';

import Search from './reusables/Search'
import { AudioOutlined } from '@ant-design/icons';
import { Col, Row } from 'react-grid-system';
const { Meta } = Card;
const S = (props: any): JSX.Element => {
    let loadingRef: any = React.createRef();
    let { search }: any = useParams();
    const [state, setState]: any = React.useState({ keepLoading: true, posts: [], initialLoad: false, notFound: false });
    const RequestForMore: Function = async (from: number) => {
        try {
            let posts: any = await axios.get('/api/post/search/' + search + '/' + from);
            console.log(posts)
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
        catch (e) {
            console.log(e)
            setState({ ...state, notFound: true, initialLoad: true })
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
                RequestForMore(state.posts.length);

            }
        };
    }


    if (!state.initialLoad) {
        RequestForMore(0);
    }
    let index = 0;
    if (state.initialLoad) {
        if (state.notFound) {
            return (<div>

                <Helmet>
                    <meta charSet="utf-8" />
                    <title>CovidHelp: {search}</title>
                    <meta name="description" content={search}></meta>
                    <meta name="keywords" content={search}></meta>
                </Helmet>
                <br />
                <Search
                    default={search}
                />
                <F04></F04></div>)
        }
        else {
            return (<div className='app'>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>CovidHelp: {search}</title>
                    <meta name="description" content={search}></meta>
                    <meta name="keywords" content={search}></meta>
                </Helmet>
                <Search />
                <div style={{ backgroundColor: '#B6AE17', paddingTop: '6%', paddingBottom: '6%', textAlign: 'center' }}>

                    <div className='posts' style={{ textAlign: 'center', marginTop: '5%', marginLeft: '10%', marginRight: '10%' }}>

                        <Row>
                            <InfiniteScroll
                                dataLength={state.posts.length} //This is important field to render the next data
                                next={() => onScroll()}
                                hasMore={state.keepLoading}
                                loader={<div style={{ marginTop: '10%', marginBottom: '10%', marginRight: '40%' }}><CircularProgress /></div>}
                                endMessage={
                                    <p style={{ textAlign: 'center', marginRight: '50%' }}>
                                        <b>You have seen all of the posts that match your criterion</b>
                                    </p>
                                }
                                // below props only if you need pull down functionality
                                refreshFunction={() => { setState({ keepLoading: true, posts: [], initialLoad: false }) }}
                                pullDownToRefresh
                                pullDownToRefreshThreshold={50}
                                pullDownToRefreshContent={
                                    <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                                }
                                releaseToRefreshContent={
                                    <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                                }
                            >
                                {state.posts.map((post: any) => {

                                    const link = '/posts/' + post._id;
                                    return (<Col key={post._id} sm={1} md={2} lg={4}>
                                        <div key={post._id}><Link to={link} ><div><Card hoverable style={{ width: '100%' }} cover={<img style={{ height: '300px' }} src={post.images[0]}></img>}>
                                            <Meta title={post.title} description={post.description} />
                                        </Card>
                                            <br /></div></Link><br /></div></Col>
                                    )
                                })




                                }
                            </InfiniteScroll>   </Row></div>
                    {/* {state.keepLoading ? <div ref={paneDidMount} className='end' style={{ margin: '10% 0%' }} onWheel={() => {
                    console.log('hey');
                }
                } onScroll={() => console.log('scrolled')}><CircularProgress /></div> : null} */}
                </div>
            </div>
            )

        }
    }
    else {
        return (<div style={{ margin: '20% 0%' }}><CircularProgress /></div>)
    }


}
export default S;
