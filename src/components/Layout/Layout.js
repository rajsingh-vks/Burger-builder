import React, { Component } from "react";
import Aux from '../../hoc/Aux';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

export class Layout extends Component {
    state = {
        showSideDrawer: false
    }
//Close Side slide
    sideDrawerCloseHandler = () =>{
        this.setState({showSideDrawer: false});
    }
    sideDrawerToggleHandler = () =>{
        this.setState(( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }
//Close Side slide
    render(){
        return(
        <Aux>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerCloseHandler}/>
            <main className="Content">
                {this.props.children}
            </main>
        </Aux>
        );
    }
}

export default Layout;