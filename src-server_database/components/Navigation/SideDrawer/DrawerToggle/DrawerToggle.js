import React, { Component } from 'react';
import './DrawerToggle.css';

export class DrawerToggle extends Component {
    render() {
        return (
            <div className="DrawerToggle" onClick={this.props.clicked}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}

export default DrawerToggle
