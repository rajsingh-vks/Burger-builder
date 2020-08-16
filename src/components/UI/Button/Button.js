import React, { Component } from 'react';
import './Button.css';

export class Button extends Component {
    render() {
        return (
            <div>
                <button 
                disabled={this.props.disabled}
                className={[Button, [this.props.btnType]].join(' ')} 
                onClick={this.props.clicked}>{this.props.children}</button>
            </div>
        )
    }
}

export default Button
