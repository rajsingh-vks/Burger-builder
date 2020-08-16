import React, { Component } from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

export class NavigationItems extends Component {
    render() {
        return (
            <ul className="NavigationItems">
                <NavigationItem link="/"  className="active">Burger Builder</NavigationItem>
                <NavigationItem link="/">Checkout</NavigationItem>
            </ul>
        )
    }
}

export default NavigationItems
