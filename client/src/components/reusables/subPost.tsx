import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
class subPosts extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            user: null
        }
    }
    async componentWillMount() {
        const u: any = await axios.get('/api/user/' + this.props.user)
        this.setState((state: any) => ({ user: { name: u.data.msg.userName, img: u.data.msg.image[0], _id: u.data.msg._id } }));
    }
    render() {
        return (<div className="sub-post">

            <img className="sub-post-image" onClick={() => {
                this.props.history.push('/posts/' + this.props._id)
            }} src={this.props.img}>
            </img>

            <Link to={"/posts/" + this.props._id}>
                <div className="sub-post-post">
                    <h3 className="sub-post-post-title">{this.props.title.length > 20 ? this.props.title.slice(0, 17) + "..." : this.props.title}</h3>
                    <p className="sub-post-post-description">{this.props.description.length > 80 ? this.props.description.slice(0, 77) + "..." : this.props.description}</p>
                </div>
            </Link>
            {this.state.user ?
                <Link to={"/profile/" + this.state.user._id}> <div className="sub-post-user">
                    <img className="sub-post-user-img" src={this.state.user.img} />
                    <p className="sub-post-user-name">{this.state.user.name.length > 20 ? this.state.user.name.slice(0, 17) + "..." : this.state.user.name}</p>
                </div> </Link> : null}
        </div>)
    }
}

export default withRouter(subPosts);