import React, { Component } from 'react';
import './Input.css';

export class Input extends Component {
    render() {
        let inputElement = null;
        const inputClass = ["InputElement"];

        if (this.props.invalid && this.props.shouldValidate && this.props.touched) {
            inputClass.push("Invalid");
        }

        switch (this.props.elementType) {
            case ('input'):
                inputElement = <input 
                className={inputClass.join(' ')}
                {...this.props.elementConfig} 
                value={this.props.value}
                onChange={this.props.changed}/>;
                break;
            case ('textarea'):
                inputElement = <textarea 
                className={inputClass} {...this.props.elementConfig} 
                value={this.props.value}
                onChange={this.props.changed}/>;
                break;
            case ('select'):
                inputElement = (
                <select 
                    className={inputClass}
                    value={this.props.value}
                    onChange={this.props.changed}>
                     {this.props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
                );
                break;   
            
            default:
                inputElement = <input 
                className={inputClass.join(' ')}
                {...this.props.elementConfig} 
                value={this.props.value}
                onChange={this.props.changed}/>;
        }
        return (
            <div className="Input">
                <label className="Label">{this.props.label}</label>
                {inputElement}
            </div>
        )
    }
}

export default Input