import React, { Component } from 'react';
import './Logo.css';

export class Logo extends Component {
    render() {
        return (
            <div className="Logo" style={{height: this.props.height}}>
                <img src="original.png" alt="Burger"/>
            </div>
        )
    }
}

export default Logo
