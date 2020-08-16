import React, { Component } from 'react';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

export class NavigationItems extends Component {
    render() {
        return (
            <ul className="NavigationItems">
                {/* <NavigationItem link="/"  className="active">Burger Builder</NavigationItem> */}
                <NavigationItem link="/" exact>Burger Builder</NavigationItem>
                {this.props.isAuthenticated ? 
                <NavigationItem link="/orders">Orders</NavigationItem>
                : null
             }
                {!this.props.isAuthenticated ?
                  <NavigationItem link="/auth">Authenticate</NavigationItem>
                  : <NavigationItem link="/logout">Logout</NavigationItem>
                }
            </ul>
        )
    }
}

export default NavigationItems
