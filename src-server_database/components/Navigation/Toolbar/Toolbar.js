import React, { Component } from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

export class Toolbar extends Component {
    render() {
        return (
            <header className="Toolbar">
              <DrawerToggle clicked={this.props.drawerToggleClicked}/>
               <Logo/>
              <nav className="DestopOnly">
                  <NavigationItems/>
              </nav>  
            </header>
        )
    }
}

export default Toolbar
