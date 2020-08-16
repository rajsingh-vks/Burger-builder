import React, { Component } from 'react';
import './Order.css';

export class Order extends Component {
    render() {
        const ingredients = [];
        for (let ingredientsName in this.props.ingredients){
            ingredients.push(
                {
                    name: ingredientsName, 
                    amount: this.props.ingredients[ingredientsName]
                }
            );
        }

        const ingredientOutput = ingredients.map(ig => {
        return <span 
          style={{ 
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
            }}
            key={ig.name}>  
            {ig.name} ({ig.amount})</span>;
        });

        return (
            <div className="Order">
                <p>Ingredients : {ingredientOutput}</p>
                <p>Price: <strong>USD  
                    {Number.parseFloat(this.props.price).toFixed(2)}</strong>
                </p>
            </div>
        )
    }
}

export default Order
