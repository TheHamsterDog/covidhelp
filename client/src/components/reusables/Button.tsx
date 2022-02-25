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
        return (<Button className="button">
            {this.props.checked}
        </Button>
        )
    }
}

export default Button;