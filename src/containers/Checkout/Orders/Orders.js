import React, { Component } from 'react';
import './Order.css';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-order';
import WithErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

export class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
        .then(res => {
            const fetchOrders = [];
            for (let key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id: key
             });
            }
            this.setState({loading: false, orders: fetchOrders});
        })
        .catch(err => {
            this.setState({loading: false});
        });
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                       key={order.key}
                       ingredients={order.ingredients}
                       price={order.price}/>
                ))}
            </div>
        )
    }
}

export default WithErrorHandler(Orders , axios)
