import React, { Component } from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

export class BuildControls extends Component {
    render() {
        const controls = [
             { label: 'Salad', type: 'salad' },
             { label: 'Bacon', type: 'bacon' },
             { label: 'Cheese', type: 'cheese' },
             { label: 'Meat', type: 'meat' },
        ];
        return (
            <div className="BuildControls">
                <p>Current Price : <strong>{this.props.price.toFixed(2)}</strong></p>
                {controls.map(ctrl => (
                    <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label}
                        added={() => this.props.ingredientAdded(ctrl.type)}
                        removed={() => this.props.ingredientRemoved(ctrl.type)}
                        disabled={this.props.disabled[ctrl.type]}/>
                ))}
                <button type="button" 
                   className="OrderButton"
                   disabled={!this.props.purchasable}
                   onClick={this.props.ordered}>Order Now</button>
            </div>
        )
    }
}

export default BuildControls
