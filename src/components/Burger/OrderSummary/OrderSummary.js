import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

export class OrderSummary extends Component {
    // This could be a functional component, doesn't have to be a class
    
    // componentWillUpdate() {
    //     console.log('[OrderSummary] WillUpdate');
    // }
    
    render() {
        //   const ingredientSummary = Object.keys( this.props.ingredients )
        //   .map(igKey =>{
        //   return <li>
        //       <span style={{ textTransform: 'capitalize'}}>
        //           {igKey}
        //       </span>: 
        //       {this.props.ingredients[igKey]}</li>
        // });


        const ingredientSummary = Object.keys( this.props.ingredients )
            .map( igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li> );
            } );

        
        return (
            <Aux>
            <div>
                <h3>Your Oder</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>{ingredientSummary}</ul>
                  <p><b>Total Price : {this.props.price.toFixed(2)}</b></p>
                <p>Countinue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseCountinue}>Countinue</Button>
            </div>
            </Aux>
        )
    }
}

export default OrderSummary
