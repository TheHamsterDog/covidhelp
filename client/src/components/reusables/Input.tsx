import React from 'react';

class Input extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            text: "",
            type: props.type || "text"
        }
    }
    render() {
        return (<div className="input"><input className="input-element" type={this.state.type} value={this.props.value} name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.onChange} />
            <p className="input-placeholder">{this.props.placeholder}</p>
        </div>
        )
    }
}

export default Input;