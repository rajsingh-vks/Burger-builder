import React, { Component } from 'react';
import './Backdrop.css';

export class Backdrop extends Component {
    render() {
        return (
            this.props.show ?
            <div className='Backdrop' onClick={this.props.clicked}>
            </div> : null
        )
    }
}

export default Backdrop
