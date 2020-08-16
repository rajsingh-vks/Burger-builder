import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinners/Spinners';



//import * as actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';


//Ingredients Price Value
// const INGREDIENT_PRICES ={
//     salad: 0.5,
//     bacon: 0.3, 
//     cheese: 0.6, 
//     meat: 0.9
// }
//Ingredients Price Value

class BurgerBuilder extends Component{
// State for Ingredients
  state = {
    // ingredients: {
    //     salad: 0,
    //     bacon: 0, 
    //     cheese: 0, 
    //     meat: 0
    // },
    //ingredients: null,
    //totalPrice: 4,
   // purchasable:false,
    purchasing:false,
    // loading: false,
    // error: false
  }
// State for Ingredients

//Dynamic Ingredients

componentDidMount () {
  // console.log(this.props)
  this.props.onInitIngredients();
  // axios.get('https://react-my-burger-d8ff5.firebaseio.com/ingredients.json')
  // .then(response => {
  //   this.setState({ingredients: response.data});
  // })
  // .catch(error => {
  //   this.setState({error: true})
  // }); 
}



// Order Now
  updatePurchaseState (ingredients){
    // const ingredients = {
    //   ...this.state.ingredients
    // };
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) =>{
        return sum + el;
      }, 0);
      //this.setState({purchasable: sum > 0});
      return sum > 0
  }
// Order Now

// Add Ingredient Inside Burger
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;

  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);
  // }
// Add Ingredient Inside Burger

// Remove Ingredient Inside Burger
  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <=0 ){
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({totalPrice: newPrice, ingredients:updatedIngredients});  
  //   this.updatePurchaseState(updatedIngredients);  
  // }
// Remove Ingredient Inside Burger

// Purchase Handler
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth');
    }
     
  }
  purchaseContinuelHandler = () => {
    // alert('You Continue');
    // const queryParams = [];
    // for (let i in this.state.ingredients){
    //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&');
    // this.props.history.push({
    //   pathname: 'checkout',
    //   search: '?' + queryString
    // });
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }
// Purchase Handler
// Purchase cancel Handler
  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }
  
// Purchase cancel Handler

  render(){
    const disabledInfo = {
      //...this.state.ingredients
      ...this.props.ings
    };
    for (let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>
    if (this.props.ings) {
      burger = (
        <Aux>
            <Burger ingredients={this.props.ings}/>
            <BuildControls 
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              purchasable={this.updatePurchaseState(this.props.ings)}
              ordered={this.purchaseHandler}
              isAuth={this.props.isAuthenticated}
              price={this.props.price}/>
        </Aux>
      );
      orderSummary = <OrderSummary 
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseCountinue={this.purchaseContinuelHandler}/>;
    }
    // if(this.state.loading){
    //   orderSummary = <Spinner/>
    // }
    return(
      <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
          {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return{
    // onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder , axios));