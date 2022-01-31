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
        return (<form className="search" onSubmit={(e) => {
            e.preventDefault();
            (this.props as any).history.push(`/search/${(this.state as any).text}`);
        }}>
            <input className="search-input" value={(this.state as any).text} placeholder="Search..." type="text" onChange={(e: any) => {
                e.persist();
                console.log(e.target.value)
                
                if (e.target.value !== undefined) {
                    this.setState(state => ({ ...state, text: e.target?.value }));
                }
            }} />
        </form>)
    }

}


export default withRouter(Search as any);