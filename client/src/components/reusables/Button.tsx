import React from 'react';

class Button extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            text: "",
            type: props.type || "text"
        }
    }
    render() {
        return (<button className="btn">
            {this.props.children}
        </button>
        )
    }
}

export default Button;