import React from 'react';
import { withRouter } from 'react-router-dom';
class Search extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            text: props.default || ""
        }
    }
    render() {
        return (<div className="header" onSubmit={(e) => {
            e.preventDefault();
            (this.props as any).history.push(`/search/${(this.state as any).text}`);
        }}>
            <h2 className="header-text">
                {this.props.children}
            </h2>
        </div>)
    }

}


export default withRouter(Search as any);