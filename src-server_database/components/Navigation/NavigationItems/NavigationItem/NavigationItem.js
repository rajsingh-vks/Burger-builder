import React, { Component } from 'react';
import './NavigationItem.css';

export class NavigationItem extends Component {
    render() {
        return (
            <div>
                <li className="NavigationItem">
                    <a href={this.props.link} 
                    className="{this.props.active ? classes.active : null}">
                        {this.props.children}
                    </a>
                </li>
            </div>
        )
    }
}

export default NavigationItem