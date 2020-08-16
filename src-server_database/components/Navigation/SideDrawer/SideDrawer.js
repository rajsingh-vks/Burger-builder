import React, { Component } from "react";
import classes from "./SideDrawer.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

export class SideDrawer extends Component {
  render() {
      let attchedClasses = [classes.SideDrawer, classes.Close];
      if (this.props.open){
          attchedClasses = [SideDrawer, classes.Close];
      }

    return (
      <Aux>
        <Backdrop show={this.props.open} clicked={this.props.closed}/>
        <div className={attchedClasses.join(' ')}>
          <div className={classes.Logo} style={{display:"none"}}>
            <Logo/>
          </div>
          <nav>
            <NavigationItems />
          </nav>
        </div>
      </Aux>
    );
  }
}

export default SideDrawer;
