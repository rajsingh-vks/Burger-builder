import React, { Component } from 'react';
import './NavigationItem.css';
import { NavLink } from 'react-router-dom';

export class NavigationItem extends Component {
    render() {
        return (
          <div>
                <li className="NavigationItem">
                   {/* <NavLink to={this.props.link} 
                    className="{this.props.active ? classes.active : null}">
                        {this.props.children}
                    </NavLink> */}
                    <NavLink 
                      to={this.props.link}
                      exact={this.props.exact}
                      activeClassName="active">{this.props.children}</NavLink>
                </li>
          </div>
        )
    }
}

export default NavigationItem