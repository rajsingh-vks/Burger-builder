import React, { Component } from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

export class CheckoutSummary extends Component {
    render() {
        return (
            <div className="CheckoutSummary">
                <h1>We hope it tastes well!</h1>
                <div style={{width: '100%' , margin: 'auto'}}>
                   <Burger ingredients={this.props.ingredients}/>
                </div>
                <Button btnType="Danger" clicked={this.props.checkoutCancelled}>Cancel</Button>
                <Button btnType="Success"  clicked={this.props.checkoutContinued}>Countinue</Button>
            </div>
        )
    }
}

export default CheckoutSummary
