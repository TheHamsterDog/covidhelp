import React from 'react';
import axios from 'axios';
import { Modal } from 'antd';

import F04 from './404';
import {Helmet} from "react-helmet";
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link, useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import { Button } from 'antd';
const { confirm } = Modal;
const Posts = (props: any) => {
    let { id }: any = useParams();
    console.log(props);

    const [state, setState]: any = React.useState({ post: {}, loaded: false, error: false, author: {}, delete: false })
    const getInfo = async (id: string) => {
        try {

            const data = await axios.get('/api/post/' + id);
            console.log(data.data.msg);
            const user = await axios.get('/api/user/' + data.data.msg.user);
            console.log(user.data.msg);
            let Delete = false;
            if(props.state.user.user!==undefined){
                console.log('something');
                
                if (user.data.msg._id.toString() === props.state.user.user._id.toString()) {
                    Delete = true;
                }
            }

            // if (user.data.msg._id.toString() === props.state.user.user._id.toString()) {
            //     Delete = true;
            // }

            setState({ post: data.data.msg, loaded: true, error: false, user: user.data.msg, delete: Delete });

        }
        catch(e) {
            console.log(e);
            
            setState({ post: {}, loaded: true, error: true })
        }
    }
    if (!state.loaded) {
        getInfo(id);
    }

    if (state.loaded) {
        if (state.error) {
            return (<F04></F04>)
        }
        else {
            let link = state.post.paypal;
            return (<div className="post" style={{ marginLeft: '20%', marginRight: '20%', textAlign: 'left' }}>
                  <Helmet>
                <meta charSet="utf-8" />
        <title>{state.post.title}</title>
               <meta name="description" content={state.post.description}></meta>
               <meta name="keywords" content={state.post.description + ' ' + state.post.title + ' ' + state.post.author + ' ' + 'Covid Help CovidHelp'}></meta>
            </Helmet> <br /> <br />
                <div>
                    <Carousel width='100%' >
                        {state.post.images.map((image: any) => {
                            return (<div style={{ height: '100%' }}>
                                <img height='100%' width='100%' src={image}></img>

                                <br /><br /><br /></div>)
                        })}
                    </Carousel>
                </div>
                
                <h1>{state.post.title}</h1>
                <br />
                <h3>description:-
                            {' ' + state.post.description}</h3>

                <br></br><Link to={'/profile/' + state.user._id}>                            <div className='author' style={{ textAlign: 'left' }}>
                    <p>Author:</p>
                    <img style={{ width: '10%', height: '5%', borderRadius: '100%' }} src={state.user.image[0]}></img>
                    <h3 style={{ marginLeft: '1%', display: 'inline' }}>{'  '} {'  ' + state.user.userName}</h3>
                </div>
                </Link>

                <br />
                <br></br>
                <div className='paypal'><a href={link}><Button type='primary' block>paypal.me link</Button></a></div>
                <br></br><br />
                {state.delete ? <Button type='primary' style={{ backgroundColor: 'red' }} onClick={async () => {
                    return (confirm({ title: 'Do You Really Want To Delete This Post?', icon: <DeleteForeverSharpIcon />, async onOk() {
                        try { await axios.delete('/api/post/' + state.post._id); window.location.reload()} catch (e) {
                        
                        }
                        
                        console.log('yes') }, onCancel() { console.log('cancelled') } }
                    )); 
                }} block ><DeleteForeverSharpIcon></DeleteForeverSharpIcon></Button> : null}
                <br /> <br /> <br />
            </div>)
        }
    }
    else {
        return (<CircularProgress></CircularProgress>)

    }
}
export default Posts;
