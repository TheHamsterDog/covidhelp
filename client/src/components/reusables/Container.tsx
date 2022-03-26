import { AnyMxRecord } from 'dns';
import React from 'react';
import { withRouter } from 'react-router-dom';
class Search extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            text: props.default || ""
        }
        console.log(this.props.className)
    }
    textClassName = this.props.textClassName? this.props.textClassName: "";
    className = this.props.className? this.props.className:"";
    render() {
        return (<div className={"header "+this.className} onSubmit={(e) => {
            e.preventDefault();
            (this.props as any).history.push(`/search/${(this.state as any).text}`);
        }}>
            <h2 className={"header-text " +this.textClassName}>
                {this.props.children}
            </h2>
        </div>)
    }

}


export default withRouter(Search as any);